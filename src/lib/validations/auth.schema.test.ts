import { describe, it, expect } from 'vitest';
import { registerSchema } from './auth.schema';

describe('registerSchema', () => {

  const validData = {
    name: 'Diogo Oliveira',
    email: 'oa.dioguinho@gmail.com',
    password: 'Diogada139@',
    confirmPassword: 'Diogada139@',
    storeName: 'Easy Catalagos'
  };

  it('Deve aceitar os dados validos do cadastro', () => {

    const result = registerSchema.safeParse(validData);

    expect(result.success).toBe(true)

    if (result.success) {
      expect(result.data).toEqual(validData);
    }
  });

  it('Deve rejeitar a senha sem a letra maiuscula', () => {
    const result = registerSchema.safeParse({
      ...validData,
      password: 'diogada139@',
      confirmPassword: 'diogada139@',
    })

    expect(result.success).toBe(false)
  })

  it('Deve rejeitar senhas diferentes', () => {
    const result = registerSchema.safeParse({
      ...validData,
      confirmPassword: 'Senhadiferente123@',
    })

    expect(result.success).toBe(false)
  })

  it('Deve normalizar o email', () => {
    const result = registerSchema.safeParse({
      ...validData,
      email: 'OA.DIOGUINHO@GMAIL.COM',
    })

    expect(result.success).toBe(true)

    if (result.success) {
      expect(result.data.email).toBe('oa.dioguinho@gmail.com')
    }
  })

  it('deve rejeitar senha sem caractere especial', () => {
    const result = registerSchema.safeParse({
      ...validData,
      password: 'Diogada139',
      confirmPassword: 'Diogada139',
    })

    expect(result.success).toBe(false)
  })

  it('deve rejeitar senha com menos de 8 caracteres', () => {
    const result = registerSchema.safeParse({
      ...validData,
      password: 'Ab1@',
      confirmPassword: 'Ab1@',
    })

    expect(result.success).toBe(false)
  })

  it('deve rejeitar senha acima de 64 caracteres', () => {
    const longPassword = 'Aa1@' + 'b'.repeat(61)

    const result = registerSchema.safeParse({
      ...validData,
      password: longPassword,
      confirmPassword: longPassword,
    })

    expect(result.success).toBe(false)
  })

  it('deve rejeitar senha que ultrapasse o limite do bcrypt em bytes', () => {
    const longPassword = 'Á'.repeat(35) + 'Aa1@'

    const result = registerSchema.safeParse({
      ...validData,
      password: longPassword,
      confirmPassword: longPassword,
    })

    expect(result.success).toBe(false)
  })

})