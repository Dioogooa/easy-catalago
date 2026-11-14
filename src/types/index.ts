/**
 * Tipos compartilhados do Easy Catalago
 * Apenas tipos/interfaces — sem lógica de negócio
 */

// ─── Enums (espelho do Prisma para uso no cliente) ──────────────
export type Status = 'ACTIVE' | 'INACTIVE'

export type EventType =
  | 'CATALOG_VIEW'
  | 'PRODUCT_VIEW'
  | 'ADD_TO_CART'
  | 'WHATSAPP_REDIRECT'
  | 'CART_SUBMIT'

// ─── Respostas de API padronizadas ──────────────────────────────
export type ApiErrorCode =
  | 'VALIDATION_ERROR'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'UPLOAD_ERROR'
  | 'DATABASE_ERROR'
  | 'INTERNAL_ERROR'

export interface ApiError {
  code: ApiErrorCode
  message: string
  details?: unknown
}

export interface ApiSuccess<T> {
  data: T
}

export type ApiResponse<T> = ApiSuccess<T> | { error: ApiError }

// ─── Carrinho (armazenado no cliente) ──────────────────────────
export interface CartItem {
  productId: string
  name: string
  price: number
  imageUrl?: string
  quantity: number
}

export interface Cart {
  storeSlug: string
  items: CartItem[]
  observation?: string
}

// ─── Paginação ─────────────────────────────────────────────────
export interface PaginatedResult<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}
