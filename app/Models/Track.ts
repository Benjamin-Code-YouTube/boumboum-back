import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Artist from './Artist'

export default class Track extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public userId: String

  @column()
  public uri: String
  
  @column()
  public popularity: String

  @column()
  public name: String

  
  @column()
  public trackImage: String
  
  @column()
  public trackId: String
  
  @column()
  public album: String


  @column()
  public favorite: Number


  @hasMany(() => Artist)
  public artists: HasMany<typeof Artist>


}
