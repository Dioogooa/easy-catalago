import { describe, it, expect } from 'vitest'
import {
  slugSchema,
  priceSchema,
  whatsappNumberSchema,
  normalizeWhatsappNumber,
  hexColorSchema,
} from '@/lib/validations/common'
import { buildWhatsAppMessage, buildWhatsAppUrl } from '@/lib/whatsapp'
import { generateImageKey, isAllowedImageType } from '@/lib/storage'

describe('Validações Comuns (lib/validations)', () => {
  it('deve validar slugs válidos e rejeitar inválidos', () => {
    expect(slugSchema.safeParse('loja-exemplo-123').success).toBe(true)
    expect(slugSchema.safeParse('loja').success).toBe(true)
    expect(slugSchema.safeParse('Loja-Exemplo').success).toBe(false) // Maiúsculas não permitidas
    expect(slugSchema.safeParse('loja_exemplo').success).toBe(false) // Underscore não permitido
    expect(slugSchema.safeParse('a').success).toBe(false) // Menos de 2 caracteres
  })

  it('deve validar preços positivos com até 2 casas decimais', () => {
    expect(priceSchema.safeParse(99.9).success).toBe(true)
    expect(priceSchema.safeParse(10).success).toBe(true)
    expect(priceSchema.safeParse(0).success).toBe(false) // Deve ser positivo
    expect(priceSchema.safeParse(-5).success).toBe(false)
    expect(priceSchema.safeParse(10.999).success).toBe(false) // Mais de 2 casas
  })

  it('deve validar e normalizar números de WhatsApp', () => {
    expect(whatsappNumberSchema.safeParse('+5511999999999').success).toBe(true)
    expect(whatsappNumberSchema.safeParse('5511999999999').success).toBe(true)
    expect(normalizeWhatsappNumber('(11) 99999-9999')).toBe('+11999999999')
    expect(normalizeWhatsappNumber('+55 11 99999-9999')).toBe('+5511999999999')
  })

  it('deve validar código de cor HEX', () => {
    expect(hexColorSchema.safeParse('#ffffff').success).toBe(true)
    expect(hexColorSchema.safeParse('#000000').success).toBe(true)
    expect(hexColorSchema.safeParse('#123456').success).toBe(true)
    expect(hexColorSchema.safeParse('white').success).toBe(false)
    expect(hexColorSchema.safeParse('#fff').success).toBe(false) // Requer 6 dígitos
  })
})

describe('WhatsApp Helper (lib/whatsapp)', () => {
  it('deve montar a mensagem de pedido corretamente', () => {
    const message = buildWhatsAppMessage({
      phoneNumber: '+5511999999999',
      greeting: 'Olá! Gostaria de fazer um pedido:',
      items: [
        { name: 'Camiseta Preta', quantity: 2, price: 49.9 },
        { name: 'Boné Street', quantity: 1, price: 79.9 },
      ],
      observation: 'Confirmar tamanho M',
      total: 179.7,
      closing: 'Obrigado!',
    })

    expect(message).toContain('Olá! Gostaria de fazer um pedido:')
    expect(message).toContain('2x — Camiseta Preta')
    expect(message).toContain('1x — Boné Street')
    expect(message).toContain('Observação: Confirmar tamanho M')
    expect(message).toContain('Total estimado:')
    expect(message).toContain('Obrigado!')
  })

  it('deve gerar url wa.me codificada', () => {
    const url = buildWhatsAppUrl('+55 11 99999-9999', 'Olá mundo')
    expect(url).toContain('https://wa.me/5511999999999?text=Ol%C3%A1%20mundo')
  })
})

describe('Storage Helpers (lib/storage)', () => {
  it('deve verificar tipos de imagem permitidos', () => {
    expect(isAllowedImageType('image/jpeg')).toBe(true)
    expect(isAllowedImageType('image/png')).toBe(true)
    expect(isAllowedImageType('image/webp')).toBe(true)
    expect(isAllowedImageType('application/pdf')).toBe(false)
  })

  it('deve gerar chaves de imagem únicas e estruturadas', () => {
    const key = generateImageKey('store-123', 'products', 'foto.png')
    expect(key.startsWith('store-123/products/')).toBe(true)
    expect(key.endsWith('.png')).toBe(true)
  })
})
