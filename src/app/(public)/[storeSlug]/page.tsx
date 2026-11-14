import { notFound } from 'next/navigation'

interface StorePageProps {
  params: Promise<{ storeSlug: string }>
}

// Placeholder — implementado na Fase 4
export default async function StorePage({ params }: StorePageProps) {
  const { storeSlug } = await params

  // TODO Fase 4: buscar loja pelo slug, renderizar catálogo
  if (!storeSlug) {
    notFound()
  }

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-bold">Catálogo: {storeSlug}</h1>
      <p className="text-gray-500 mt-2">
        Catálogo público será implementado na Fase 4.
      </p>
    </main>
  )
}

export async function generateMetadata({ params }: StorePageProps) {
  const { storeSlug } = await params
  return {
    title: storeSlug,
  }
}
