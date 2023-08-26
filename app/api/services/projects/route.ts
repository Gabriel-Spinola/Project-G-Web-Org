import { prisma } from '@/lib/database/prisma'
import { ModelsApiCode } from '@/lib/database/table.types';
import { servicesHandler } from '../services-handler';
import { NextResponse } from 'next/server';

async function getData(id: string, modelCode: ModelsApiCode) {
	let data = null

	switch (req.method) {
		case 'POST':

			break

		case 'GET':

			break

		case 'PUT':
			// data = await prisma.project.update({
			// 	where: { id: id },
			// 	data: undefined
			// })
			break

		case 'DELETE':
			break

		default: return NextResponse.json({ message: 'method not allowed' }, { status: 405 })
	}
}

const handler = (req: Request) => servicesHandler(req, getData)

export { handler as GET, handler as POST, handler as PUT, handler as DELETE }