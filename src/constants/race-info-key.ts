import type { InjectionKey } from 'vue'
import type { Race } from '../types/race'

export const RACE_INFO_KEY: InjectionKey<Race> =
  Symbol('race info')
