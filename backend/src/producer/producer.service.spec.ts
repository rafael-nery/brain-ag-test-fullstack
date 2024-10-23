import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { NotFoundException } from '@nestjs/common'
import { Producer } from '@producer/producer.entity'
import { ProducerService } from '@producer/producer.service'
import { LoggingService } from '@/logging/logging.service'

class MockProducer extends Producer {
  constructor(partial: Partial<Producer>) {
    super()
    Object.assign(this, partial)
  }
}

describe('ProducerService', () => {
  let service: ProducerService
  let repository: Repository<Producer>
  let logger: LoggingService

  const mockProducerData = {
    id: 1,
    cpfCnpj: '123.456.789-00',
    name: 'Test Name',
    farmName: 'Test Farm',
    city: 'Test City',
    state: 'TS',
    totalArea: 1000,
    arableLand: 800,
    vegetationArea: 200,
    crops: ['Soja', 'Milho'],
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null
  }

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
    createQueryBuilder: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockReturnThis(),
      getRawOne: jest.fn(),
      getRawMany: jest.fn()
    }))
  }

  const mockLogger = {
    log: jest.fn(),
    error: jest.fn(),
    warn: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProducerService,
        {
          provide: getRepositoryToken(Producer),
          useValue: mockRepository
        },
        {
          provide: LoggingService,
          useValue: mockLogger
        }
      ]
    }).compile()

    service = module.get<ProducerService>(ProducerService)
    repository = module.get<Repository<Producer>>(getRepositoryToken(Producer))
    logger = module.get<LoggingService>(LoggingService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    const createDto = {
      cpfCnpj: '123.456.789-00',
      name: 'Test Name',
      farmName: 'Test Farm',
      city: 'Test City',
      state: 'TS',
      totalArea: 1000,
      arableLand: 800,
      vegetationArea: 200,
      crops: ['Soja', 'Milho']
    }

    it('should create a producer', async () => {
      const newProducer = new MockProducer(mockProducerData)
      mockRepository.create.mockReturnValue(newProducer)
      mockRepository.save.mockResolvedValue(newProducer)

      const result = await service.create(createDto)

      expect(result).toEqual(newProducer)
      expect(mockLogger.log).toHaveBeenCalledWith(expect.stringContaining('Creating new producer'), 'ProducerService')
    })

    it('should handle errors during creation', async () => {
      const error = new Error('Database error')
      mockRepository.save.mockRejectedValue(error)

      await expect(service.create(createDto)).rejects.toThrow(error)
      expect(mockLogger.error).toHaveBeenCalled()
    })
  })

  describe('findAll', () => {
    it('should return an array of producers', async () => {
      const producers = [new MockProducer(mockProducerData)]
      mockRepository.find.mockResolvedValue(producers)

      const result = await service.findAll()

      expect(result).toEqual(producers)
      expect(mockLogger.log).toHaveBeenCalledWith('Fetching all producers', 'ProducerService')
    })

    it('should handle errors when finding all producers', async () => {
      const error = new Error('Database error')
      mockRepository.find.mockRejectedValue(error)

      await expect(service.findAll()).rejects.toThrow(error)
      expect(mockLogger.error).toHaveBeenCalled()
    })
  })

  describe('findOne', () => {
    it('should return a producer if found', async () => {
      const producer = new MockProducer(mockProducerData)
      mockRepository.findOne.mockResolvedValue(producer)

      const result = await service.findOne(1)

      expect(result).toEqual(producer)
      expect(mockLogger.log).toHaveBeenCalledWith(expect.stringContaining('Fetching producer with ID: 1'), 'ProducerService')
    })

    it('should throw NotFoundException if producer not found', async () => {
      mockRepository.findOne.mockResolvedValue(null)

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException)
      expect(mockLogger.warn).toHaveBeenCalled()
    })
  })

  describe('update', () => {
    const updateDto = { name: 'Updated Name' }

    it('should update a producer if found', async () => {
      const producer = new MockProducer(mockProducerData)
      const updatedProducer = new MockProducer({ ...mockProducerData, ...updateDto })
      mockRepository.findOne.mockResolvedValue(producer)
      mockRepository.save.mockResolvedValue(updatedProducer)

      const result = await service.update(1, updateDto)

      expect(result).toEqual(updatedProducer)
      expect(mockLogger.log).toHaveBeenCalledWith(expect.stringContaining('updated successfully'), 'ProducerService')
    })

    it('should throw NotFoundException if producer not found', async () => {
      mockRepository.findOne.mockResolvedValue(null)

      await expect(service.update(1, updateDto)).rejects.toThrow(NotFoundException)
      expect(mockLogger.warn).toHaveBeenCalled()
    })
  })

  describe('remove', () => {
    it('should remove a producer if found', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 1 })

      await service.remove(1)

      expect(mockLogger.log).toHaveBeenCalledWith(expect.stringContaining('successfully removed'), 'ProducerService')
    })

    it('should throw NotFoundException if producer not found', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 0 })

      await expect(service.remove(1)).rejects.toThrow(NotFoundException)
      expect(mockLogger.warn).toHaveBeenCalled()
    })
  })

  describe('getDashboardTotals', () => {
    it('should return dashboard totals', async () => {
      const mockTotals = {
        totalProducers: 1,
        totalArea: 1000,
        cropDistribution: [{ crop: 'Soja', count: '1' }]
      }

      mockRepository.count.mockResolvedValue(1)
      mockRepository.createQueryBuilder().getRawOne.mockResolvedValue({ total: 1000 })
      mockRepository.createQueryBuilder().getRawMany.mockResolvedValue([{ crop: 'Soja', count: '1' }])

      const result = await service.getDashboardTotals()

      expect(result).toEqual(mockTotals)
      expect(mockLogger.log).toHaveBeenCalledWith(expect.stringContaining('Dashboard totals fetched successfully'), 'ProducerService')
    })

    it('should handle errors when fetching dashboard totals', async () => {
      const error = new Error('Database error')
      mockRepository.count.mockRejectedValue(error)

      await expect(service.getDashboardTotals()).rejects.toThrow(error)
      expect(mockLogger.error).toHaveBeenCalled()
    })
  })
})
