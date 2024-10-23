export type Producer = {
  id: number
  cpfCnpj: string
  name: string
  farmName: string
  city: string
  state: string
  totalArea: number
  arableLand: number
  vegetationArea: number
  crops: string[]
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}