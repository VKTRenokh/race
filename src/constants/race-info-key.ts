import type { InjectionKey } from 'vue'
import type { RaceInfo } from '../types/race-info'

export const RACE_INFO_KEY: InjectionKey<RaceInfo> =
  Symbol('race info')
