import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import AppDataSource from '@config/typeorm.config'
import { ProducerModule } from '@producer/producer.module'
import { WinstonModule } from 'nest-winston'
import { loggerConfig } from '@config/logger.config'
import { LoggingService } from '@/logging/logging.service'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(AppDataSource.options),
    WinstonModule.forRoot(loggerConfig),
    ProducerModule
  ],
  providers: [LoggingService],
  exports: [LoggingService]
})
export class AppModule {}
