export type Broker = {
  id: number
  name: string
  email: string
}

export type CreateBrokerPayload = {
  email: string
  name: string
}
