/**
 * Seed de desenvolvimento — Easy Catalago
 *
 * Cria dados mínimos para testar localmente.
 * Execute: pnpm prisma db seed
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed de desenvolvimento...')

  // Limpar dados existentes (ordem respeitando FK)
  await prisma.catalogEvent.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.storeSettings.deleteMany()
  await prisma.store.deleteMany()
  await prisma.user.deleteMany()

  // ─── Usuário lojista de exemplo ────────────────────────────
  const user = await prisma.user.create({
    data: {
      name: 'Lojista Demo',
      email: 'demo@easycatalago.com',
      // Senha: "demo1234" — hash de exemplo, NÃO usar em produção
      passwordHash: '$2b$12$placeholder_hash_substituir_na_fase1',
    },
  })

  // ─── Loja demo ─────────────────────────────────────────────
  const store = await prisma.store.create({
    data: {
      ownerId: user.id,
      name: 'Loja Demo',
      slug: 'loja-demo',
      description: 'Loja de exemplo do Easy Catalago',
    },
  })

  // ─── Configurações da loja ─────────────────────────────────
  await prisma.storeSettings.create({
    data: {
      storeId: store.id,
      primaryColor: '#1a1a1a',
      secondaryColor: '#ffffff',
      backgroundColor: '#f5f5f5',
      textColor: '#1a1a1a',
      whatsappGreeting: 'Olá! Gostaria de fazer um pedido:',
      whatsappClosing: 'Aguardo confirmação. Obrigado!',
      showHero: true,
      showCategories: true,
    },
  })

  // ─── Categoria de exemplo ───────────────────────────────────
  const category = await prisma.category.create({
    data: {
      storeId: store.id,
      name: 'Destaque',
      slug: 'destaque',
      description: 'Produtos em destaque',
      status: 'ACTIVE',
      position: 0,
    },
  })

  // ─── Produto de exemplo ─────────────────────────────────────
  await prisma.product.create({
    data: {
      storeId: store.id,
      categoryId: category.id,
      name: 'Produto Exemplo',
      slug: 'produto-exemplo',
      description: 'Descrição do produto de exemplo para desenvolvimento.',
      price: 99.9,
      status: 'ACTIVE',
      position: 0,
    },
  })

  console.log('✅ Seed concluído!')
  console.log(`   Usuário: ${user.email}`)
  console.log(`   Loja: ${store.name} (slug: ${store.slug})`)
  console.log(`   Acesse: http://localhost:3000/${store.slug}`)
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
