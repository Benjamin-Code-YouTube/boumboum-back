import { HttpException } from '@adonisjs/http-server/build/src/Exceptions/HttpException'
import { ErrorCode } from 'App/Exceptions/ErrorCode'

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new TechnicalException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class TechnicalException extends HttpException {
  constructor(message?: string, code?: string) {
    super(message ?? ErrorCode.TECHNICAL_ERROR, 500, code ?? ErrorCode.TECHNICAL_ERROR)
  }
}
