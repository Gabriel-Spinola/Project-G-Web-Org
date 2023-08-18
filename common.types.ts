export interface ProjectInterface {
  title: string
  description: string
  projectImages: string[]
  liveSiteUrl: string
  category: string
  id: string
  createdBy: {
    name: string
    email: string
    avatarUrl: string
    id: string
  }
}

export interface UserProfile {
  id: string
  username: string
  email: string
  description: string | null
  avatarUrl: string
  linkedinUrl: string | null
  projects: {
    edges: { node: ProjectInterface }[]
    pageInfo: {
      hasPreviousPage: boolean
      hasNextPage: boolean
      startCursor: string
      endCursor: string
    }
  }
}
