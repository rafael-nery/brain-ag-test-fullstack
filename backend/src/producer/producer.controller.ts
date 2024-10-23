import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ProducerService } from '@producer/producer.service'
import { CreateProducerDto } from '@producer/dto/create-producer.dto'
import { Producer } from '@producer/producer.entity'
import { UpdateProducerDto } from '@producer/dto/update-producer.dto'
import { DashboardTotalsDto } from '@producer/dto/dashboard.dto'

@ApiTags('producers')
@Controller('producers')
export class ProducerController {
  constructor(private readonly producerService: ProducerService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new producer' })
  @ApiResponse({ status: 201, description: 'The producer has been successfully created.', type: Producer })
  create(@Body(ValidationPipe) createProducerDto: CreateProducerDto) {
    return this.producerService.create(createProducerDto)
  }

  @Get()
  @ApiOperation({ summary: 'Get all producers' })
  @ApiResponse({ status: 200, description: 'Return all producers.', type: [Producer] })
  findAll() {
    return this.producerService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a producer by id' })
  @ApiResponse({ status: 200, description: 'Return the producer.', type: Producer })
  findOne(@Param('id') id: string) {
    return this.producerService.findOne(+id)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a producer' })
  @ApiResponse({ status: 200, description: 'The producer has been successfully updated.', type: Producer })
  update(@Param('id') id: string, @Body(ValidationPipe) updateProducerDto: UpdateProducerDto) {
    return this.producerService.update(+id, updateProducerDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a producer' })
  @ApiResponse({ status: 200, description: 'The producer has been successfully deleted.' })
  remove(@Param('id') id: string) {
    return this.producerService.remove(+id)
  }

  @Get('dashboard/totals')
  @ApiOperation({ summary: 'Get dashboard totals' })
  @ApiResponse({
    status: 200,
    description: 'Return dashboard totals.',
    type: DashboardTotalsDto
  })
  getDashboardTotals(): Promise<DashboardTotalsDto> {
    return this.producerService.getDashboardTotals()
  }
}
