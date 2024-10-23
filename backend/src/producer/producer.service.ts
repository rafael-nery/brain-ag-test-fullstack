import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Producer } from '@producer/producer.entity'
import { LoggingService } from '@/logging/logging.service'
import { CreateProducerDto } from '@producer/dto/create-producer.dto'
import { UpdateProducerDto } from '@producer/dto/update-producer.dto'
import { DashboardTotalsDto } from '@producer/dto/dashboard.dto'

@Injectable()
export class ProducerService {
  constructor(
    @InjectRepository(Producer)
    private producerRepository: Repository<Producer>,
    private readonly logger: LoggingService
  ) {}

  async create(createProducerDto: CreateProducerDto): Promise<Producer> {
    this.logger.log(`Creating new producer with CPF/CNPJ: ${createProducerDto.cpfCnpj}`, 'ProducerService')

    try {
      const producer = this.producerRepository.create(createProducerDto)
      const savedProducer = await this.producerRepository.save(producer)

      this.logger.log(`Producer created successfully with ID: ${savedProducer.id}`, 'ProducerService')

      return savedProducer
    } catch (error) {
      this.logger.error(`Failed to create producer: ${error.message}`, error.stack, 'ProducerService')
      throw error
    }
  }

  async findAll(): Promise<Producer[]> {
    this.logger.log('Fetching all producers', 'ProducerService')

    try {
      const producers = await this.producerRepository.find()
      this.logger.log(`Found ${producers.length} producers`, 'ProducerService')
      return producers
    } catch (error) {
      this.logger.error('Failed to fetch producers', error.stack, 'ProducerService')
      throw error
    }
  }

  async findOne(id: number): Promise<Producer> {
    this.logger.log(`Fetching producer with ID: ${id}`, 'ProducerService')

    const producer = await this.producerRepository.findOne({ where: { id } })

    if (!producer) {
      this.logger.warn(`Producer with ID ${id} not found`, 'ProducerService')
      throw new NotFoundException(`Producer with ID ${id} not found`)
    }

    this.logger.log(`Found producer ${id}`, 'ProducerService')
    return producer
  }

  async update(id: number, updateProducerDto: UpdateProducerDto): Promise<Producer> {
    this.logger.log(`Updating producer with ID: ${id}`, 'ProducerService')

    try {
      const producer = await this.producerRepository.findOne({ where: { id } })

      if (!producer) {
        this.logger.warn(`Producer with ID ${id} not found`, 'ProducerService')
        throw new NotFoundException(`Producer with ID ${id} not found`)
      }

      Object.assign(producer, updateProducerDto)
      const updatedProducer = await this.producerRepository.save(producer)

      this.logger.log(`Producer ${id} updated successfully`, 'ProducerService')

      return updatedProducer
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error
      }

      this.logger.error(`Failed to update producer ${id}: ${error.message}`, error.stack, 'ProducerService')
      throw error
    }
  }

  async remove(id: number): Promise<void> {
    this.logger.log(`Removing producer with ID: ${id}`, 'ProducerService')

    try {
      const result = await this.producerRepository.delete(id)

      if (result.affected === 0) {
        this.logger.warn(`Producer with ID ${id} not found for removal`, 'ProducerService')
        throw new NotFoundException(`Producer with ID ${id} not found`)
      }

      this.logger.log(`Producer ${id} successfully removed`, 'ProducerService')
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error
      }

      this.logger.error(`Failed to remove producer ${id}: ${error.message}`, error.stack, 'ProducerService')
      throw error
    }
  }

  async getDashboardTotals(): Promise<DashboardTotalsDto> {
    this.logger.log('Fetching dashboard data', 'ProducerService')

    try {
      // Total de fazendas em quantidade
      const totalFarms = await this.producerRepository.count()

      // Total de área em hectares
      const totalAreaResult = await this.producerRepository
        .createQueryBuilder('producer')
        .select('COALESCE(SUM(producer.totalArea), 0)', 'total')
        .where('producer.deletedAt IS NULL')
        .getRawOne()

      // Distribuição por estado
      const stateDistribution = await this.producerRepository
        .createQueryBuilder('producer')
        .select('producer.state', 'state')
        .addSelect('COUNT(*)', 'count')
        .where('producer.deletedAt IS NULL')
        .groupBy('producer.state')
        .getRawMany()

      // Distribuição por cultura usando string_to_array
      const cropDistribution = await this.producerRepository
        .createQueryBuilder('producer')
        .select('crop', 'crop')
        .addSelect('COUNT(*)', 'count')
        .from(subQuery => {
          return subQuery.select("UNNEST(string_to_array(crops, ','))", 'crop').from(Producer, 'producer').where('producer.deletedAt IS NULL')
        }, 'crop_counts')
        .groupBy('crop')
        .getRawMany()

      // Uso do solo (total de áreas agricultáveis e de vegetação)
      const landUseResult = await this.producerRepository
        .createQueryBuilder('producer')
        .select('COALESCE(SUM(producer.arableLand), 0)', 'arableLand')
        .addSelect('COALESCE(SUM(producer.vegetationArea), 0)', 'vegetationArea')
        .where('producer.deletedAt IS NULL')
        .getRawOne()

      // Some os valores para calcular o total
      const landUseTotal = Number(landUseResult.arableLand) + Number(landUseResult.vegetationArea)

      this.logger.log(`Dashboard data fetched successfully. Total farms: ${totalFarms}`, 'ProducerService')

      const result: DashboardTotalsDto = {
        totalFarms,
        totalArea: Number(totalAreaResult.total) || 0,
        stateDistribution: stateDistribution.map(item => ({
          state: item.state,
          count: Number(item.count),
          percentage: Number(((Number(item.count) / totalFarms) * 100).toFixed(2))
        })),
        cropDistribution: cropDistribution.map(item => ({
          crop: item.crop,
          count: Number(item.count),
          percentage: Number(((Number(item.count) / totalFarms) * 100).toFixed(2))
        })),
        landUseDistribution: {
          arableLand: Number(landUseResult.arableLand) || 0,
          vegetationArea: Number(landUseResult.vegetationArea) || 0,
          arableLandPercentage: Number(((Number(landUseResult.arableLand) / landUseTotal) * 100).toFixed(2)),
          vegetationAreaPercentage: Number(((Number(landUseResult.vegetationArea) / landUseTotal) * 100).toFixed(2))
        }
      }

      return result
    } catch (error) {
      this.logger.error(`Failed to fetch dashboard data: ${error.message}`, error.stack, 'ProducerService')
      throw error
    }
  }
}
