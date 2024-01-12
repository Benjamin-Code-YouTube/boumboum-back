import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Artist from './Artist'
import User from 'App/Models/User'
import { beforeCreate } from '@adonisjs/lucid/build/src/Orm/Decorators'
import { v4 as uuid } from 'uuid'

export default class Track extends BaseModel {
  @beforeCreate()
  public static async createUUID(track: Track) {
    track.id = uuid()
  }

  @column({ isPrimary: true })
  public id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public userId: User['id']

  @column()
  public uri: string

  @column()
  public popularity: string

  @column()
  public name: string

  @column()
  public tractImage: string

  @column()
  public trackId: Track['id']

  @column()
  public album: string

  @column()
  public favorite: number

  @hasMany(() => Artist)
  public artists: HasMany<typeof Artist>
}
