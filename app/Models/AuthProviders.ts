import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { SocialProviders } from '@ioc:Adonis/Addons/Ally'
import User from 'App/Models/User'
import { DateTime } from 'luxon'

export default class AuthProviders extends BaseModel {
  @column({ isPrimary: true })
  public name: keyof SocialProviders

  /**
   * Value of the token
   */
  @column()
  public accessToken: string

  /**
   * Refresh token
   */
  @column()
  public refreshToken: string

  /**
   * Token type
   */
  @column()
  public type: string

  /**
   * Static time in seconds when the token will expire
   */
  @column()
  public expiresIn?: number

  /**
   * Timestamp at which the token expires
   */
  @column.dateTime({
    autoCreate: false,
    autoUpdate: false,
  })
  public expiresAt?: DateTime

  /**
   * Provider User Id
   */
  @column()
  public providerUserId: string

  /**
   * User relation
   */
  @column()
  public userId: User['id']
}
