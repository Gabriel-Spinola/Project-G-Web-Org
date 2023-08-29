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
		const formData = await req.formData()

		// Required in the form
		const name: string = formData.get('name')!.toString()
		const email: string = formData.get('email')!.toString()
		const password: string = formData.get('password')!.toString()

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
		return NextResponse.json(
			{
				status: "error",
				message: error.message,
			},
			{ status: 500 }
		)
	}
}