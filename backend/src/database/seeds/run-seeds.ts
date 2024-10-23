import AppDataSource from '@config/typeorm.config'
import CreateInitialData from '@/database/seeds/initial-data.seed'

async function runSeeds() {
  try {
    await AppDataSource.initialize()
    console.log('Data Source has been initialized!')

    const seeder = new CreateInitialData()
    await seeder.run(null, AppDataSource)

    console.log('Seeds have been executed successfully!')
  } catch (error) {
    console.error('Error during Data Source initialization or seed execution', error)
  } finally {
    await AppDataSource.destroy()
  }
}

runSeeds()
