import type { Broker } from './broker'

export type Team = {
  id: number
  name: string
  brokers: Broker[]
}

export type TeamsResponse = {
  data: Team[]
}

export type TeamResponse = {
  data: Team
}
