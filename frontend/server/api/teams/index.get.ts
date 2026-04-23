import { buildBackendUrl } from '../../utils/backend'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()

  return await $fetch(buildBackendUrl('/api/teams', config.backendBaseUrl))
})
