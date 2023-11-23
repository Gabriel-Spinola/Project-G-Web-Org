import { API_ENDPOINTS, API_URL } from '@/lib/apiConfig'
import { ESResponse, FullProject } from '@/lib/types/common'
import { ESFailed, ESSucceed } from '@/lib/types/helpers'

export async function fetchProjects(
  page = 1,
  signal?: AbortSignal,
  profileId?: string,
): Promise<ESResponse<FullProject[]>> {
  const endpoint = profileId
    ? `${API_URL}${API_ENDPOINTS.services.projects}${page}/${profileId}`
    : `${API_URL}${API_ENDPOINTS.services.projects}${page}/`

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': process.env.API_SECRET as string,
      },
      next: { tags: ['revalidate-project'] },
      signal,
    })

    if (!response.ok) {
      const { data }: { data: string } = await response.json()

      throw new Error("Response's not ok: " + data)
    }

    const { data }: { data: FullProject[] } = await response.json()

    return ESSucceed(data)
  } catch (error: unknown) {
    return ESFailed(error)
  }
}

export async function fetchProjectById(
  id: string,
): Promise<ESResponse<FullProject>> {
  try {
    const response = await fetch(
      `${API_URL}${API_ENDPOINTS.services.projects}only/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': process.env.API_SECRET as string,
        },
        next: { tags: ['revalidate-project'] },
      },
    )

    if (!response.ok) {
      const { data }: { data: string } = await response.json()

      throw new Error("Response's not ok: " + data)
    }

    const { data }: { data: FullProject } = await response.json()

    return ESSucceed(data)
  } catch (error: unknown) {
    return ESFailed(error)
  }
}

export async function deleteProject(
  id: string,
): Promise<ESResponse<FullProject>> {
  try {
    const response = await fetch(
      `${API_URL}${API_ENDPOINTS.services.projects}only/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': process.env.API_SECRET as string,
        },
      },
    )

    if (!response.ok) {
      const { data }: { data: string } = await response.json()

      throw new Error("Response's not ok: " + data)
    }

    const { data }: { data: FullProject } = await response.json()

    return ESSucceed(data)
  } catch (error: unknown) {
    return ESFailed(error)
  }
}

export async function createNewProject(
  id: string,
  formData: FormData,
): Promise<ESResponse<string>> {
  try {
    const response = await fetch(
      `${API_URL}${API_ENDPOINTS.services.projects}only/${id}`,
      {
        method: 'POST',
        body: formData,
        headers: {
          'X-API-Key': process.env.API_SECRET as string,
        },
      },
    )

    const { data }: { data: string } = await response.json()

    if (!response.ok) {
      throw new Error('response not ok ' + JSON.stringify(data))
    }

    return ESSucceed(data)
  } catch (error: unknown) {
    console.error(error)

    return ESFailed(error)
  }
}

export async function updateProject(
  id: string,
  formData: FormData,
): Promise<ESResponse<string>> {
  try {
    const response = await fetch(
      `${API_URL}${API_ENDPOINTS.services.projects}only/${id}`,
      {
        method: 'PATCH',
        body: formData,
        headers: {
          'X-API-Key': process.env.API_SECRET as string,
        },
      },
    )

    const { data }: { data: string } = await response.json()

    if (!response.ok) {
      throw new Error('response not ok ' + JSON.stringify(data))
    }

    return ESSucceed(data)
  } catch (error: unknown) {
    console.error(error)

    return ESFailed(error)
  }
}
