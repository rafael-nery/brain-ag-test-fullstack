import { ApiProperty } from '@nestjs/swagger'

export class DashboardStateDistributionDto {
  @ApiProperty({
    example: 'SP',
    description: 'Estado do produtor'
  })
  state: string

  @ApiProperty({
    example: 10,
    description: 'Número de produtores no estado'
  })
  count: number

  @ApiProperty({
    example: 25.5,
    description: 'Porcentagem de produtores no estado'
  })
  percentage: number
}

export class DashboardCropDistributionDto {
  @ApiProperty({
    example: 'Soja',
    description: 'Nome da cultura'
  })
  crop: string

  @ApiProperty({
    example: 15,
    description: 'Número de produtores que cultivam esta cultura'
  })
  count: number

  @ApiProperty({
    example: 37.5,
    description: 'Porcentagem de produtores que cultivam esta cultura'
  })
  percentage: number
}

export class DashboardLandUseDistributionDto {
  @ApiProperty({
    example: 5000,
    description: 'Área total agricultável em hectares'
  })
  arableLand: number

  @ApiProperty({
    example: 2000,
    description: 'Área total de vegetação em hectares'
  })
  vegetationArea: number

  @ApiProperty({
    example: 71.43,
    description: 'Porcentagem da área total que é agricultável'
  })
  arableLandPercentage: number

  @ApiProperty({
    example: 28.57,
    description: 'Porcentagem da área total que é de vegetação'
  })
  vegetationAreaPercentage: number
}

export class DashboardTotalsDto {
  @ApiProperty({
    example: 100,
    description: 'Número total de fazendas'
  })
  totalFarms: number

  @ApiProperty({
    example: 7000,
    description: 'Área total em hectares'
  })
  totalArea: number

  @ApiProperty({
    type: [DashboardStateDistributionDto],
    description: 'Distribuição de fazendas por estado'
  })
  stateDistribution: DashboardStateDistributionDto[]

  @ApiProperty({
    type: [DashboardCropDistributionDto],
    description: 'Distribuição de culturas'
  })
  cropDistribution: DashboardCropDistributionDto[]

  @ApiProperty({
    type: DashboardLandUseDistributionDto,
    description: 'Distribuição do uso do solo'
  })
  landUseDistribution: DashboardLandUseDistributionDto
}
