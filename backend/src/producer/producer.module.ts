import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LoggingService } from '@/logging/logging.service'
import { Producer } from '@producer/producer.entity'
import { ProducerController } from '@producer/producer.controller'
import { ProducerService } from '@producer/producer.service'

@Module({
  imports: [TypeOrmModule.forFeature([Producer])],
  controllers: [ProducerController],
  providers: [ProducerService, LoggingService]
})
export class ProducerModule {}
