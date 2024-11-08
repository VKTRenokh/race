import { carBrands } from '../constants/car-brands'
import { carModels } from '../constants/car-models'
import { selectRandom } from './select-random'

export const randomCarName = () =>
  `${selectRandom(carBrands)} ${selectRandom(carModels)}`
