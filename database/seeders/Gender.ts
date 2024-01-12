import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Gender from 'App/Models/Gender'

export default class extends BaseSeeder {
  public async run() {
    await Gender.createMany([
      {
        name: 'Male',
      },
      {
        name: 'Female',
      },
      {
        name: 'Other',
      },
    ])
  }
}
