import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasMany, HasMany, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Track from './Track'
import Artist from './Artist'
import Profile from './Profile'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public provider: string

  @column()
  public access_token: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // @beforeSave()
  // public static async hashPassword (user: User) {
  //   if (user.$dirty.password) {
  //     user.password = await Hash.make(user.password)
  //   }
  // }

  @hasOne(() => Profile)
  public profile: HasOne<typeof Profile>

  @hasMany(() => Track)
  public tracks: HasMany<typeof Track>

  @hasMany(() => Artist)
  public artists: HasMany<typeof Artist>

}
