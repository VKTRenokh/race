import { baseUrl } from '@/utils/base-url'
import { mande } from 'mande'

export const garage = mande(baseUrl('/garage'))
