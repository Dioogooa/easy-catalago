// Layout para área de autenticação (login/cadastro)
// Sem sidebar, sem header admin — tela limpa e centralizada

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Easy Catalago</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Sua loja digital no WhatsApp
          </p>
        </div>
        {children}
      </div>
    </div>
  )
}
