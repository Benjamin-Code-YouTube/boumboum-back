import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Genre from './Genre'
import User from 'App/Models/User'
import { v4 as uuid } from 'uuid'
import { beforeCreate } from '@adonisjs/lucid/build/src/Orm/Decorators'

export default class Artist extends BaseModel {
  @beforeCreate()
  public static async createUUID(artist: Artist) {
    artist.id = uuid()
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
  public name: string

  @column()
  public type: string

  @column()
  public popularity: string

  @column()
  public uri: string

  @column()
  public spotifyArtistId: string

  @column()
  public artistImage: string

  @hasMany(() => Genre)
  public genres: HasMany<typeof Genre>
}
