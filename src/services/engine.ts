import { baseUrl } from '@/utils/base-url'
import { mande } from 'mande'

export const engine = mande(baseUrl('/engine'))

export interface StartEngineResponse {
  velocity: number
  distance: number
}

export const startEngine = (id: number) =>
  engine.patch<StartEngineResponse>(null, {
    query: { id, status: 'started' }
  })
