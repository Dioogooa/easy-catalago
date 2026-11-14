import { z } from 'zod'

// ─── Slugs ────────────────────────────────────────────────────
export const slugSchema = z
  .string()
  .min(2, 'Slug deve ter pelo menos 2 caracteres')
  .max(100, 'Slug deve ter no máximo 100 caracteres')
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    'Slug deve conter apenas letras minúsculas, números e hífens',
  )

// ─── Preço ────────────────────────────────────────────────────
export const priceSchema = z
  .number()
  .positive('Preço deve ser maior que zero')
  .multipleOf(0.01, 'Preço deve ter no máximo 2 casas decimais')

// ─── WhatsApp ─────────────────────────────────────────────────
export const whatsappNumberSchema = z
  .string()
  .regex(
    /^\+?[1-9]\d{7,14}$/,
    'Número inválido. Use o formato internacional: +5511999999999',
  )

export function normalizeWhatsappNumber(number: string): string {
  // Remove tudo que não for dígito ou +
  const cleaned = number.replace(/[^\d+]/g, '')
  // Garante que começa com +
  return cleaned.startsWith('+') ? cleaned : `+${cleaned}`
}

// ─── Status ───────────────────────────────────────────────────
export const statusSchema = z.enum(['ACTIVE', 'INACTIVE'])

// ─── Paginação ────────────────────────────────────────────────
export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
})

// ─── Cor HEX ──────────────────────────────────────────────────
export const hexColorSchema = z
  .string()
  .regex(/^#[0-9A-Fa-f]{6}$/, 'Cor deve estar no formato HEX (#RRGGBB)')

// ─── URL ──────────────────────────────────────────────────────
export const urlSchema = z.string().url('URL inválida').max(2048)
