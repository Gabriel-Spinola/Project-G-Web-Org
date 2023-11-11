import { API_ENDPOINTS, API_URL } from '@/lib/apiConfig'
import { ESResponse } from '@/lib/types/common'
import { ESFailed, ESSucceed } from '@/lib/types/helpers'
import { Project } from '@prisma/client'

export async function fetchProject(): Promise<ESResponse<Project[]>> {
  try {
    const response = await fetch(
      `${API_URL}${API_ENDPOINTS.services.projects}`,
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

    const { data }: { data: Project[] } = await response.json()

    return ESSucceed(data)
  } catch (error: unknown) {
    return ESFailed(error)
  }
}

export async function fetchProjectById(
  id: string,
): Promise<ESResponse<Project>> {
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

    const { data }: { data: Project } = await response.json()

    return ESSucceed(data)
  } catch (error: unknown) {
    return ESFailed(error)
  }
}

export async function deleteProject(id: string): Promise<ESResponse<Project>> {
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

    const { data }: { data: Project } = await response.json()

    return ESSucceed(data)
  } catch (error: unknown) {
    return ESFailed(error)
  }
}
