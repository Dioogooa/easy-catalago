import { afterAll, afterEach, describe, expect, it, vi } from "vitest";
import { compare } from "bcryptjs";

import { prisma } from "@/lib/db/prisma";
import { registerUser } from "@/modules/auth/services/register.user"
import { randomUUID } from "node:crypto";


vi.mock("node:crypto", async (imporOriginal) => {
    const actual = await imporOriginal<typeof import("node:crypto")>()

    return {
        ...actual,
        randomUUID: vi.fn(
            () => "12345678-1234-1234-1234-123456789012",
        ),
    }
})

const testEmails = [
    "cadastro@teste.com",
    "duplicado@teste.com",
    "rollback@teste.com",
    "senha@teste.com",
    "owner-rollback@teste.com",
]

describe("registerUser - Integração", () => {
    afterEach(async () => {
        await prisma.user.deleteMany({
            where: {
                email: { in: testEmails },
            },
        })
    })

    afterAll(async () => {
        await prisma.$disconnect()
    })
    it("deve criar usuário e loja com sucesso", async () => {
        const result = await registerUser({
            name: "Usuário Teste",
            email: "cadastro@teste.com",
            password: "Teste@123",
            storeName: "Loja de Teste",
        })

        expect(result.success).toBe(true)

        const user = await prisma.user.findUnique({
            where: { email: "cadastro@teste.com" },
            include: { store: true },
        })

        expect(user).not.toBeNull()
        expect(user?.name).toBe("Usuário Teste")
        expect(user?.store?.name).toBe("Loja de Teste")
        expect(user?.store?.slug).toBeTruthy()
    })

    it("deve retornar EMAIL_ALREADY_EXISTS quando o e-mail já estiver cadastrado", async () => {
        const data = {
            name: "Usuário Teste",
            email: "duplicado@teste.com",
            password: "Teste@123",
            storeName: "Minha Loja",
        }

        await registerUser(data)

        const result = await registerUser({
            ...data,
            storeName: "Outra Loja",
        })

        expect(result).toEqual({
            success: false,
            error: "EMAIL_ALREADY_EXISTS",
        })

        const users = await prisma.user.count({
            where: { email: data.email },
        })

        expect(users).toBe(1)
    })

    it("deve reverter a criação do usuário quando a loja não puder ser criada", async () => {
        const owner = await prisma.user.create({
            data: {
                name: "Dono da Loja",
                email: "owner-rollback@teste.com",
                passwordHash: "hash-irrelevante",
            },
        })

        await prisma.store.create({
            data: {
                ownerId: owner.id,
                name: "Loja Colisão",
                slug: "loja-colisao-12345678",
            },
        })

        await expect(
            registerUser({
                name: "Novo Usuário",
                email: "rollback@teste.com",
                password: "Teste@123",
                storeName: "Loja Colisão",
            }),
        ).rejects.toMatchObject({
            code: "P2002",
        })

        const user = await prisma.user.findUnique({
            where: { email: "rollback@teste.com" },
        })

        expect(user).toBeNull()
    })

    it("deve armazenar o hash da senha, nunca a senha original", async () => {
        const password = "SenhaSegura@123"

        await registerUser({
            name: "Usuário Senha",
            email: "senha@teste.com",
            password,
            storeName: "Loja da Senha",
        })

        const user = await prisma.user.findUnique({
            where: { email: "senha@teste.com" },
        })

        expect(user).not.toBeNull()
        expect(user?.passwordHash).not.toBe(password)

        const passwordIsValid = await compare(
            password,
            user?.passwordHash ?? "",
        )

        expect(passwordIsValid).toBe(true)
    })
})