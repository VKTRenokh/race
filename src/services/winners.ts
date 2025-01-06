import { baseUrl } from '@/utils/base-url'
import { mande } from 'mande'

export const winners = mande(baseUrl('/winners'))
