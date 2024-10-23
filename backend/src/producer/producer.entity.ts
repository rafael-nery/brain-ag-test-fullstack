import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

@Entity()
export class Producer {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number

  @Column({ unique: true })
  @ApiProperty()
  cpfCnpj: string

  @Column()
  @ApiProperty()
  name: string

  @Column()
  @ApiProperty()
  farmName: string

  @Column()
  @ApiProperty()
  city: string

  @Column()
  @ApiProperty()
  state: string

  @Column('float')
  @ApiProperty()
  totalArea: number

  @Column('float')
  @ApiProperty()
  arableLand: number

  @Column('float')
  @ApiProperty()
  vegetationArea: number

  @Column('simple-array')
  @ApiProperty()
  crops: string[]

  @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty()
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  @ApiProperty()
  updatedAt: Date

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  @ApiProperty({ required: false })
  deletedAt?: Date

  @BeforeInsert()
  protected beforeInsert() {
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }

  @BeforeUpdate()
  protected beforeUpdate() {
    this.updatedAt = new Date()
  }
}
