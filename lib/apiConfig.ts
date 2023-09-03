export const API_ENDPOINTS = {
  services: {
    findUnique: 'api/services/find-unique/',
    findMany: 'api/services/',
  },
  handlers: {
    createProject: 'api/handlers/CreateProjectFormHandler/',
    updateUser: 'api/handlers/update-user/',
  },
}

export const API_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/'
    : 'productionurl'
