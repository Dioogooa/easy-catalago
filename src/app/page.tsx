import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Logo / Nome */}
        <div className="space-y-2">
          <h1 className="text-5xl font-bold tracking-tight">
            Easy Catalago
          </h1>
          <p className="text-xl text-gray-600">
            Crie seu catálogo digital e receba pedidos pelo WhatsApp
          </p>
        </div>

        {/* Status da fundação */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-green-800">
          ✅ <strong>Fase 0 — Fundação</strong>: Aplicação iniciada com sucesso.
          PostgreSQL, Prisma e estrutura modular configurados.
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/cadastro"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-black text-white font-medium hover:bg-gray-800 transition-colors"
          >
            Criar minha loja
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-gray-300 font-medium hover:bg-gray-50 transition-colors"
          >
            Entrar
          </Link>
        </div>

        <p className="text-xs text-gray-400">
          Easy Catalago — versão MVP em desenvolvimento
        </p>
      </div>
    </main>
  )
}
