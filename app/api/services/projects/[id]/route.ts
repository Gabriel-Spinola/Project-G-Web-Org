import { handlePost } from '../../posts/_post'

export function handler(req: Request, { params }: { params: { id: string } }) {
  const { id } = params

  switch (req.method) {
    case 'POST':
      return handlePost(id, req)
  }
}

export { handler as POST }
