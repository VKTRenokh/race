import { carBrands } from '../constants/car-brands'
import { carModels } from '../constants/car-models'

export const randomCarName = () => {
  return `${carBrands[Math.floor(Math.random() * carBrands.length)]} ${carModels[Math.floor(Math.random() * carModels.length)]}`
}
