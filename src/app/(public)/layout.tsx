// Layout público do catálogo — implementado na Fase 4
interface PublicLayoutProps {
  children: React.ReactNode
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return <>{children}</>
}
