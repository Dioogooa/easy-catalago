'use server'

import { registerSchema } from "@/lib/validations/auth.schema"
import { registerUser } from "@/modules/auth/services/register.user"

type RegisterField =
    | 'name'
    | 'email'
    | 'password'
    | 'confirmPassword'
    | 'storeName'


export type RegisterActionState = {
    status: 'idle' | 'success' | 'error'
    message: string
    fieldErrors?: Partial<Record<RegisterField, string[]>>
}

export async function registerUserAction(
    _previousState: RegisterActionState,
    formData: FormData,
): Promise<RegisterActionState> {
    const validation = registerSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
        storeName: formData.get('storeName'),
    })

    if (!validation.success) {
        return {
            status: 'error',
            message: 'Verifique os campos e tente novamente.',
            fieldErrors: validation.error.flatten().fieldErrors,
        }
    }

    const { confirmPassword, ...registerData } = validation.data

    try {
        const result = await registerUser(registerData)

        if (!result.success) {
            return {
                status: 'error',
                message: 'Este e-mail já esta cadastrado.',
                fieldErrors: {
                    email: ['Utilize outro endereço de e-mail.'],
                },
            }
        }
        return {
            status: 'success',
            message: 'Cadastro realizado com sucesso!',
        }
    } catch (error) {
        console.error('[registerUserAction]', error)

        return {
            status: 'error',
            message: 'Não foi possível realizar o cadastro. Tente novamente.',
        }
    }
}