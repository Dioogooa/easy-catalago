/**
 * Interface de Storage — abstrai o provedor de objetos (MinIO local / S3 / R2)
 *
 * Em desenvolvimento: MinIO via Docker
 * Em produção: S3-compatível (configurado por variável de ambiente)
 */

export interface StorageObject {
  key: string
  url: string
  contentType: string
  size: number
}

export interface StorageProvider {
  upload(options: UploadOptions): Promise<StorageObject>
  delete(key: string): Promise<void>
  getUrl(key: string): string
}

export interface UploadOptions {
  key: string
  buffer: Buffer
  contentType: string
  size: number
}

// Tipos permitidos de imagem
export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
] as const

export type AllowedImageType = (typeof ALLOWED_IMAGE_TYPES)[number]

// Tamanho máximo de imagem: 5 MB
export const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024

export function isAllowedImageType(type: string): type is AllowedImageType {
  return ALLOWED_IMAGE_TYPES.includes(type as AllowedImageType)
}

export function generateImageKey(
  storeId: string,
  folder: 'products' | 'categories' | 'store',
  originalName: string,
): string {
  const ext = originalName.split('.').pop()?.toLowerCase() ?? 'jpg'
  const timestamp = Date.now()
  const random = Math.random().toString(36).slice(2, 9)
  return `${storeId}/${folder}/${timestamp}-${random}.${ext}`
}
