import { DateTime } from 'luxon'
import { BaseModel, HasOne, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Gender from './Gender'
import User from 'App/Models/User'
import { v4 as uuid } from 'uuid'
import { beforeCreate } from '@adonisjs/lucid/build/src/Orm/Decorators'

export default class Profile extends BaseModel {
  @beforeCreate()
  public static async createUUID(profile: Profile) {
    profile.id = uuid()
  }

  @column({ isPrimary: true })
  public id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public dateOfBirth: Date

  @column()
  public description: string

  @column()
  public avatar: string

  @column()
  public preferedGenderId: number

  @column()
  public userId: User['id']

  @hasOne(() => Gender)
  public preferedGender: HasOne<typeof Gender>
}
