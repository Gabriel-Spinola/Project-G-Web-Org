import { NextResponse } from 'next/server'

async function handler(req: Request) {
  const url = new URL(req.url) // Create a URL object from the request URL
  const queryParams = url.searchParams // Access the query parameters

  if (req.method === 'POST') {
    // Parse the form data
    const formData = await req.formData()

    // Access form field values
    const title = formData.get('title')
    const projectDescription = formData.get('project-description')

    return NextResponse.json({
      message: title,
    })
  } else {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 })
  }
}

export { handler as GET, handler as POST }