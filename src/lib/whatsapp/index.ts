/**
 * Utilitário para geração de links e mensagens do WhatsApp
 */

export interface WhatsAppMessageOptions {
  phoneNumber: string
  greeting?: string
  items: WhatsAppItem[]
  observation?: string
  total: number
  closing?: string
}

export interface WhatsAppItem {
  name: string
  quantity: number
  price: number
}

/**
 * Gera a mensagem formatada para o WhatsApp
 */
export function buildWhatsAppMessage(options: WhatsAppMessageOptions): string {
  const { greeting, items, observation, total, closing } = options

  const lines: string[] = []

  if (greeting) {
    lines.push(greeting)
    lines.push('')
  }

  items.forEach((item) => {
    lines.push(`${item.quantity}x — ${item.name}`)
  })

  if (observation?.trim()) {
    lines.push('')
    lines.push(`Observação: ${observation.trim()}`)
  }

  lines.push('')
  lines.push(`Total estimado: ${formatCurrency(total)}`)

  if (closing) {
    lines.push('')
    lines.push(closing)
  }

  return lines.join('\n')
}

/**
 * Gera o link wa.me com a mensagem codificada
 */
export function buildWhatsAppUrl(
  phoneNumber: string,
  message: string,
): string {
  const encoded = encodeURIComponent(message)
  const number = phoneNumber.replace(/\D/g, '')
  return `https://wa.me/${number}?text=${encoded}`
}

/**
 * Formata valor monetário em BRL
 */
function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}
