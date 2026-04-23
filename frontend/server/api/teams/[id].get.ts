import { buildBackendUrl } from '../../utils/backend'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const id = getRouterParam(event, 'id')

  return await $fetch(buildBackendUrl(`/api/teams/${id}`, config.backendBaseUrl))
})
