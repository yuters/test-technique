import type { MaybeRef } from 'vue'

import type { CreateBrokerPayload } from '#shared/types/broker'
import type { TeamResponse, TeamsResponse } from '#shared/types/team'

export const useTeamsApi = () => {
  const useTeamsIndex = () => {
    return useFetch<TeamsResponse>('/api/teams', {
      key: 'teams-index',
    })
  }

  const useTeam = (teamId: MaybeRef<string>) => {
    const resolvedTeamId = computed(() => unref(teamId))

    return useFetch<TeamResponse>(() => `/api/teams/${resolvedTeamId.value}`, {
      key: () => `team-${resolvedTeamId.value}`,
      watch: [resolvedTeamId],
    })
  }

  const deleteTeam = (teamId: string) => {
    return $fetch(`/api/teams/${teamId}`, {
      method: 'DELETE',
    })
  }

  const createBroker = (teamId: string, payload: CreateBrokerPayload) => {
    return $fetch(`/api/teams/${teamId}/brokers`, {
      method: 'POST',
      body: payload,
    })
  }

  return {
    createBroker,
    deleteTeam,
    useTeam,
    useTeamsIndex,
  }
}
