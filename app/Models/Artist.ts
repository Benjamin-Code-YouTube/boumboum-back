import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Genre from './Genre'

export default class Artist extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public userId: String

  @column()
  public name: String

  @column()
  public type: String
  
  @column()
  public popularity: String
  
  @column()
  public uri: String
  
  @column()
  public spotifyArtistId: String
  
  @column()
  public artistImage: String


  @hasMany(() => Genre)
  public genres: HasMany<typeof Genre>

}
