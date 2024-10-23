import { OmitType, PartialType } from '@nestjs/swagger'
import { CreateProducerDto } from '@producer/dto/create-producer.dto'

export class UpdateProducerDto extends PartialType(OmitType(CreateProducerDto, ['cpfCnpj'] as const)) {}
