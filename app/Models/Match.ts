import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import { v4 as uuid } from 'uuid'
import { beforeCreate } from '@adonisjs/lucid/build/src/Orm/Decorators'

export default class Match extends BaseModel {
  @beforeCreate()
  public static async createUUID(match: Match) {
    match.id = uuid()
  }

  @column({ isPrimary: true })
  public id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public matcherUserId: User['id']

  @column()
  public matchedUserId: User['id']

  @column()
  public mutualMatch: boolean

  @column()
  public matchDate: Date
}
