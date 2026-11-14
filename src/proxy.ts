import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Middleware de autenticação — implementado completamente na Fase 1
// Por ora, apenas define as rotas protegidas

const PROTECTED_ROUTES = ['/admin']
const AUTH_ROUTES = ['/login', '/cadastro']

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // TODO Fase 1: verificar sessão do Auth.js e redirecionar
  // Por enquanto, apenas passa adiante

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route),
  )

  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route))

  // Placeholder: em produção, verificará token de sessão
  void isProtectedRoute
  void isAuthRoute

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
