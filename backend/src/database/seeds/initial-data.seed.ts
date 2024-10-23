import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { Producer } from '@/producer/producer.entity'

export default class CreateInitialData implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const producerRepository = connection.getRepository(Producer)

    const producers = [
      {
        cpfCnpj: '123.456.789-00',
        name: 'João Silva',
        farmName: 'Fazenda Boa Vista',
        city: 'Campinas',
        state: 'SP',
        totalArea: 1000,
        arableLand: 800,
        vegetationArea: 200,
        crops: ['Soja', 'Milho']
      },
      {
        cpfCnpj: '98.765.432/0001-00',
        name: 'Agropecuária ABC Ltda.',
        farmName: 'Fazenda Horizonte Verde',
        city: 'Uberlândia',
        state: 'MG',
        totalArea: 2500,
        arableLand: 2000,
        vegetationArea: 500,
        crops: ['Soja', 'Milho', 'Algodão']
      },
      {
        cpfCnpj: '234.567.890-11',
        name: 'Maria Santos',
        farmName: 'Sítio Felicidade',
        city: 'Ribeirão Preto',
        state: 'SP',
        totalArea: 150,
        arableLand: 100,
        vegetationArea: 50,
        crops: ['Café']
      },
      {
        cpfCnpj: '34.567.890/0001-12',
        name: 'Fazendas Reunidas Ltda.',
        farmName: 'Fazenda Bom Sucesso',
        city: 'Goiânia',
        state: 'GO',
        totalArea: 5000,
        arableLand: 4000,
        vegetationArea: 1000,
        crops: ['Soja', 'Milho', 'Algodão', 'Cana de Açúcar']
      },
      {
        cpfCnpj: '345.678.901-22',
        name: 'Carlos Ferreira',
        farmName: 'Rancho Alegre',
        city: 'Cuiabá',
        state: 'MT',
        totalArea: 3000,
        arableLand: 2500,
        vegetationArea: 500,
        crops: ['Soja', 'Milho']
      },
      {
        cpfCnpj: '45.678.901/0001-23',
        name: 'Agroindústria Verde Ltda.',
        farmName: 'Fazenda Primavera',
        city: 'Dourados',
        state: 'MS',
        totalArea: 4000,
        arableLand: 3500,
        vegetationArea: 500,
        crops: ['Soja', 'Milho', 'Cana de Açúcar']
      },
      {
        cpfCnpj: '456.789.012-33',
        name: 'Ana Rodrigues',
        farmName: 'Sítio São José',
        city: 'Franca',
        state: 'SP',
        totalArea: 80,
        arableLand: 60,
        vegetationArea: 20,
        crops: ['Café']
      },
      {
        cpfCnpj: '56.789.012/0001-34',
        name: 'Cooperativa Agrícola Sul',
        farmName: 'Fazenda Cooperada',
        city: 'Cascavel',
        state: 'PR',
        totalArea: 6000,
        arableLand: 5000,
        vegetationArea: 1000,
        crops: ['Soja', 'Milho', 'Trigo']
      },
      {
        cpfCnpj: '567.890.123-44',
        name: 'Pedro Almeida',
        farmName: 'Chácara Vista Linda',
        city: 'Bragança Paulista',
        state: 'SP',
        totalArea: 50,
        arableLand: 30,
        vegetationArea: 20,
        crops: ['Hortaliças']
      },
      {
        cpfCnpj: '67.890.123/0001-45',
        name: 'Agropecuária Nordeste S.A.',
        farmName: 'Fazenda Mandacaru',
        city: 'Barreiras',
        state: 'BA',
        totalArea: 8000,
        arableLand: 6500,
        vegetationArea: 1500,
        crops: ['Soja', 'Algodão', 'Café']
      },
      {
        cpfCnpj: '678.901.234-55',
        name: 'Fernanda Costa',
        farmName: 'Rancho Esperança',
        city: 'Rio Verde',
        state: 'GO',
        totalArea: 1200,
        arableLand: 1000,
        vegetationArea: 200,
        crops: ['Soja', 'Milho']
      },
      {
        cpfCnpj: '78.901.234/0001-56',
        name: 'Agrotech Inovações Ltda.',
        farmName: 'Fazenda Tecnológica',
        city: 'Piracicaba',
        state: 'SP',
        totalArea: 1500,
        arableLand: 1300,
        vegetationArea: 200,
        crops: ['Cana de Açúcar', 'Soja']
      },
      {
        cpfCnpj: '789.012.345-66',
        name: 'Roberto Mendes',
        farmName: 'Sítio Beija-Flor',
        city: 'Holambra',
        state: 'SP',
        totalArea: 30,
        arableLand: 25,
        vegetationArea: 5,
        crops: ['Flores']
      },
      {
        cpfCnpj: '89.012.345/0001-67',
        name: 'Fazendas Unidas do Oeste',
        farmName: 'Complexo Agropecuário Oeste',
        city: 'Rondonópolis',
        state: 'MT',
        totalArea: 12000,
        arableLand: 10000,
        vegetationArea: 2000,
        crops: ['Soja', 'Milho', 'Algodão', 'Girassol']
      },
      {
        cpfCnpj: '890.123.456-77',
        name: 'Luciana Campos',
        farmName: 'Fazenda Campos Verdes',
        city: 'Uberaba',
        state: 'MG',
        totalArea: 2200,
        arableLand: 1800,
        vegetationArea: 400,
        crops: ['Soja', 'Milho', 'Sorgo']
      },
      {
        cpfCnpj: '90.123.456/0001-78',
        name: 'Agro Sustentável S.A.',
        farmName: 'Fazenda Eco Vida',
        city: 'Sorriso',
        state: 'MT',
        totalArea: 7000,
        arableLand: 5500,
        vegetationArea: 1500,
        crops: ['Soja', 'Milho', 'Girassol', 'Algodão']
      },
      {
        cpfCnpj: '901.234.567-88',
        name: 'Antônio Oliveira',
        farmName: 'Sítio Santa Luzia',
        city: 'São Carlos',
        state: 'SP',
        totalArea: 100,
        arableLand: 80,
        vegetationArea: 20,
        crops: ['Laranja', 'Limão']
      }
    ]

    for (const producerData of producers) {
      const producer = producerRepository.create(producerData)
      await producerRepository.save(producer)
    }
  }
}
