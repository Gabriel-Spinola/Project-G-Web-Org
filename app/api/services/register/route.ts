import { prisma } from "@/lib/database/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

type RegisterResponse = NextResponse<Record<string, any>>

type UserData = {
	name: string
	email: string
	password: string
}

export async function POST(req: Request): Promise<RegisterResponse> {
	try {
		const { name, email, password } = (await req.json() as UserData)
		const hashedPassword = await hash(password, 12)

		const user = await prisma.user.create({
			data: {
				name,
				email: email.toLowerCase(),
				password: hashedPassword,
			}
		})

		return NextResponse.json({
			user: {
				name: user.name,
				email: user.email
			}
		})
	} catch (error: any) {
		return new NextResponse(
			JSON.stringify({
				status: "error",
				message: error.message,
			}),
			{ status: 500 }
		)
	}
}