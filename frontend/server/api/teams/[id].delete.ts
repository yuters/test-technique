import { buildBackendUrl } from '../../utils/backend'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const id = getRouterParam(event, 'id')

  await $fetch(buildBackendUrl(`/api/teams/${id}`, config.backendBaseUrl), {
    method: 'DELETE',
  })

  setResponseStatus(event, 204)
})
