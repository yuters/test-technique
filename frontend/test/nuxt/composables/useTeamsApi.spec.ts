import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useTeamsApi } from '#imports'

const { fetchMock, useFetchMock } = vi.hoisted(() => {
  return {
    fetchMock: vi.fn(),
    useFetchMock: vi.fn(),
  }
})

mockNuxtImport('useFetch', () => useFetchMock)

describe('useTeamsApi', () => {
  beforeEach(() => {
    fetchMock.mockReset()
    useFetchMock.mockReset()
    vi.stubGlobal('$fetch', fetchMock)
  })

  it('loads the team list with a stable cache key', () => {
    const response = { data: { value: [] } }

    useFetchMock.mockReturnValue(response)

    const teamsApi = useTeamsApi()

    expect(teamsApi.useTeamsIndex()).toBe(response)
    expect(useFetchMock).toHaveBeenCalledWith('/api/teams', {
      key: 'teams-index',
    }, expect.any(String))
  })

  it('loads one team with a team-specific cache key', () => {
    const response = { data: { value: null } }

    useFetchMock.mockReturnValue(response)

    const teamsApi = useTeamsApi()

    expect(teamsApi.useTeam('42')).toBe(response)
    expect(useFetchMock).toHaveBeenCalledWith('/api/teams/42', {
      key: 'team-42',
    }, expect.any(String))
  })

  it('sends broker creation requests to the team brokers endpoint', async () => {
    fetchMock.mockResolvedValue({ ok: true })

    const teamsApi = useTeamsApi()
    const payload = {
      email: 'broker@example.com',
      name: 'Broker Name',
    }

    await teamsApi.createBroker('42', payload)

    expect(fetchMock).toHaveBeenCalledWith('/api/teams/42/brokers', {
      body: payload,
      method: 'POST',
    })
  })

  it('sends team deletions to the team endpoint', async () => {
    fetchMock.mockResolvedValue({ ok: true })

    const teamsApi = useTeamsApi()

    await teamsApi.deleteTeam('42')

    expect(fetchMock).toHaveBeenCalledWith('/api/teams/42', {
      method: 'DELETE',
    })
  })
})
