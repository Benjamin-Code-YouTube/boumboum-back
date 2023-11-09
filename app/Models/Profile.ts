import { DateTime } from 'luxon'
import { BaseModel, HasOne, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Gender from './Gender'

export default class Profile extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public dateOfBirth: Date
w
  @column()
  public description: String
  
  @column()
  public avatar: String

  @column()
  public preferedGenderId: Number

  @column()
  public userId: Number

  @hasOne(() => Gender)
  public preferedGender: HasOne<typeof Gender>

}
