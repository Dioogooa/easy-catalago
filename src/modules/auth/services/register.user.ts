import { hash } from "bcryptjs";
import { z } from "zod";
import { Prisma } from "@prisma/client"
import { randomUUID } from "node:crypto"


import { prisma } from "@/lib/db/prisma";
import { registerSchema } from "@/lib/validations/auth.schema";

type RegisterUserInput = Omit<
    z.infer<typeof registerSchema>,
    "confirmPassword"
>

function generateSlug(name: string) {
    const baseSlug = name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")

    return `${baseSlug || "loja"}-${randomUUID().slice(0, 8)}`
}

export async function registerUser(data: RegisterUserInput) {
    const passwordHash = await hash(data.password, 12)
    const slug = generateSlug(data.storeName)

    try {
        const result = await prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    name: data.name,
                    email: data.email,
                    passwordHash
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            })

            const store = await tx.store.create({
                data: {
                    name: data.storeName,
                    slug,
                    ownerId: user.id,
                },
                select: {
                    id: true,
                    name: true,
                    slug: true
                },
            })

            return { user, store }
        })

        return {
            success: true as const,
            data: result,
        }
    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2002"
        ) {
            const target = error.meta?.target

            if (
                target === "email" ||
                (Array.isArray(target) && target.includes("email"))
            ) {
                return {
                    success: false as const,
                    error: "EMAIL_ALREADY_EXISTS" as const,
                }
            }
        }
        throw error
    }
}


