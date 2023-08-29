import { AuthOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

type SessionResponse = NextResponse<Record<string, any>>

export async function GET(req: Request): Promise<SessionResponse> {
	const session = await getServerSession(AuthOptions)

	return NextResponse.json({
		//               session != null ? true : false
		isAuthenticated: !!session,
		session
	})
}