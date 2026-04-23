import type { CreateBrokerPayload } from '#shared/types/broker'
import type { TeamResponse, TeamsResponse } from '#shared/types/team'

export const useTeamsApi = () => {
  const useTeamsIndex = () => {
    return useFetch<TeamsResponse>('/api/teams', {
      key: 'teams-index',
    })
  }

  const useTeam = (teamId: string) => {
    return useFetch<TeamResponse>(`/api/teams/${teamId}`, {
      key: `team-${teamId}`,
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
