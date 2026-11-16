import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { loginSchema } from '@/lib/validations/auth.schema'
import { prisma } from '@/lib/db/prisma'
import { compare } from 'bcryptjs'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {
          label: 'E-mail',
          type: 'email',
          placeholder: 'seu@email.com',
        },
        password: {
          label: 'Senha',
          type: 'password',
        },
      },
      async authorize(credentials) {
        const result = loginSchema.safeParse(credentials)

        if (!result.success) {
          return null
        }

        const { email, password } = result.data

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        })

        if (!user || !user.passwordHash) {
          return null
        }

        const passwordIsValid = await compare(
          password,
          user.passwordHash,
        )

        if (!passwordIsValid) {
          return null
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        }

      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
})