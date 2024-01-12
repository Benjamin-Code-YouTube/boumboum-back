import { DateTime } from 'luxon'
import { column, BaseModel, hasOne, HasOne, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'
import { beforeCreate } from '@adonisjs/lucid/build/src/Orm/Decorators'
import Profile from 'App/Models/Profile'
import Track from 'App/Models/Track'
import Artist from 'App/Models/Artist'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public email: string

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(user: User) {
    user.id = uuid()
  }

  @hasOne(() => Profile)
  public profile: HasOne<typeof Profile>

  @hasMany(() => Track)
  public tracks: HasMany<typeof Track>

  @hasMany(() => Artist)
  public artists: HasMany<typeof Artist>
}
