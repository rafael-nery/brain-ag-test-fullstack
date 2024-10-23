import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { IsValidArea } from '@common/validators/area.validator'
import { IsCpfCnpj } from '@common/validators/cpf-cnpj.validator'
import { Producer } from '@producer/producer.entity'

export class CreateProducerDto implements Omit<Producer, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'beforeInsert' | 'beforeUpdate'> {
  @ApiProperty({
    description: 'CPF ou CNPJ do produtor',
    example: '123.456.789-00'
  })
  @IsNotEmpty({ message: 'CPF/CNPJ é obrigatório' })
  @IsString({ message: 'CPF/CNPJ deve ser uma string' })
  @IsCpfCnpj()
  cpfCnpj: string

  @ApiProperty({
    description: 'Nome do produtor',
    example: 'João Silva'
  })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @IsString({ message: 'Nome deve ser uma string' })
  name: string

  @ApiProperty({
    description: 'Nome da fazenda',
    example: 'Fazenda Boa Vista'
  })
  @IsNotEmpty({ message: 'Nome da fazenda é obrigatório' })
  @IsString({ message: 'Nome da fazenda deve ser uma string' })
  farmName: string

  @ApiProperty({
    description: 'Cidade',
    example: 'Campinas'
  })
  @IsNotEmpty({ message: 'Cidade é obrigatória' })
  @IsString({ message: 'Cidade deve ser uma string' })
  city: string

  @ApiProperty({
    description: 'Estado',
    example: 'SP'
  })
  @IsNotEmpty({ message: 'Estado é obrigatório' })
  @IsString({ message: 'Estado deve ser uma string' })
  state: string

  @ApiProperty({
    description: 'Área total em hectares',
    example: 1000,
    minimum: 0
  })
  @IsNumber({}, { message: 'Área total deve ser um número' })
  @Min(0, { message: 'Área total não pode ser negativa' })
  totalArea: number

  @ApiProperty({
    description: 'Área agricultável em hectares',
    example: 800,
    minimum: 0
  })
  @IsNumber({}, { message: 'Área agricultável deve ser um número' })
  @Min(0, { message: 'Área agricultável não pode ser negativa' })
  @IsValidArea()
  arableLand: number

  @ApiProperty({
    description: 'Área de vegetação em hectares',
    example: 200,
    minimum: 0
  })
  @IsNumber({}, { message: 'Área de vegetação deve ser um número' })
  @Min(0, { message: 'Área de vegetação não pode ser negativa' })
  @IsValidArea()
  vegetationArea: number

  @ApiProperty({
    description: 'Lista de culturas plantadas',
    example: ['Soja', 'Milho'],
    type: [String],
    minItems: 1
  })
  @IsArray({ message: 'Culturas deve ser um array' })
  @ArrayMinSize(1, { message: 'Deve haver pelo menos uma cultura' })
  @IsString({ each: true, message: 'Cada cultura deve ser uma string' })
  crops: string[]
}
