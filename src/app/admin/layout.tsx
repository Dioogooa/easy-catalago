// Layout do painel administrativo — implementado completamente na Fase 1
// Por ora, apenas um wrapper com proteção de rota placeholder

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar e header admin — implementados na Fase 1 */}
      <div className="flex">
        {/* Sidebar placeholder */}
        <aside className="w-64 min-h-screen bg-white border-r border-gray-200 hidden lg:block">
          <div className="p-6">
            <span className="font-bold text-lg">Easy Catalago</span>
            <p className="text-xs text-gray-400 mt-1">Painel Admin</p>
          </div>
          <nav className="px-4 space-y-1">
            {['Dashboard', 'Produtos', 'Categorias', 'Personalização', 'Configurações'].map((item) => (
              <div
                key={item}
                className="flex items-center px-3 py-2 text-sm text-gray-600 rounded-md hover:bg-gray-50"
              >
                {item}
              </div>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  )
}
