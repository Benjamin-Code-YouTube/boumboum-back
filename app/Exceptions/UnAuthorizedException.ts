import {HttpException} from "@adonisjs/http-server/build/src/Exceptions/HttpException";

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new UnAuthorizedException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class UnAuthorizedException extends HttpException {
  constructor(message?: string, code?: string) {
    super(message ?? "", 401, code)
  }
}
