import { z } from "zod";
import { isWithinBcryptLimit } from "../utils/passwords";

export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .toLowerCase()
        .min(1, "Email obrigatório")
        .pipe(z.email("Formato de email inválido")),

    password: z
        .string()
        .min(1, "Senha obrigatória")
});

export const registerSchema = z.object({
    name: z.string().trim().min(2, 'Nome muito curto'),

    email: z
        .string()
        .trim()
        .toLowerCase()
        .min(1, 'Email é obrigatorio')
        .pipe(z.email('Formato de email inválido')),

    password: z
        .string()
        .min(8, 'Senha deve ter ao menos 8 caracteres')
        .max(64, 'Senha deve ter no maximo 64 caracteres')
        .regex(/[A-Z]/, 'Deve conter ao menos uma letra Maiúscula')
        .regex(/[a-z]/, 'Deve conter ao menos uma letra minúscula')
        .regex(/[0-9]/, 'Deve conter ao menos um número')
        .regex(/[\p{P}\p{S}]/u, 'Deve conter ao menos um caractere especial')
        .refine(isWithinBcryptLimit, 'Senha muito longa'),

    confirmPassword: z
        .string()
        .min(1, "Confirme sua senha"),


    storeName: z
        .string()
        .trim()
        .min(2, 'Nome da loja muito curto')
})
    .refine((data) => data.password === data.confirmPassword,
        {
            message: 'As senhas não coincidem',
            path: ['confirmPassword'],
        },
    )
