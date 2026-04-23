import { buildBackendUrl } from '../../../utils/backend'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  return await $fetch(buildBackendUrl('/api/brokers', config.backendBaseUrl), {
    method: 'POST',
    body: {
      ...body,
      team_id: Number(id),
    },
  })
})
