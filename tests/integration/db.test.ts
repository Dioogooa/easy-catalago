import { describe, it, expect, afterAll } from 'vitest'
import { prisma } from '@/lib/db'

describe('Conexão e Integridade com o Banco PostgreSQL (Prisma)', () => {
  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('deve conectar ao banco e consultar a loja inserida no seed', async () => {
    const store = await prisma.store.findUnique({
      where: { slug: 'loja-demo' },
      include: {
        owner: true,
        settings: true,
        categories: true,
        products: true,
      },
    })

    expect(store).not.toBeNull()
    expect(store?.name).toBe('Loja Demo')
    expect(store?.owner.email).toBe('demo@easycatalago.com')
    expect(store?.settings?.primaryColor).toBe('#1a1a1a')
    expect(store?.categories.length).toBeGreaterThan(0)
    expect(store?.products.length).toBeGreaterThan(0)
    expect(Number(store?.products[0]?.price)).toBe(99.9)
  })

  it('deve respeitar a unicidade de slug por loja', async () => {
    const store = await prisma.store.findUnique({
      where: { slug: 'loja-demo' },
    })
    expect(store).not.toBeNull()

    // Tentar criar categoria com mesmo slug na mesma loja deve falhar
    if (store) {
      await expect(
        prisma.category.create({
          data: {
            storeId: store.id,
            name: 'Destaque Duplicado',
            slug: 'destaque', // Já existe no seed
          },
        }),
      ).rejects.toThrow()
    }
  })
})
