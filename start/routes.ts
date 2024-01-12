/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import AuthMiddleware from 'App/Middleware/Auth'

Route.get('health', ({ response }) => response.noContent())

Route.group(() => {
  Route.group(() => {
    Route.get('/auth/spotify', 'authSpotify.controller.authorize')
    Route.get('/auth/spotify/callback', 'authSpotify.controller.callback')
    Route.get('/auth/success', 'auth.controller.success')
    Route.post('/auth/logout', 'auth.controller.logout')
  }).namespace('App/auth')

  Route.group(() => {
    Route.get('/profile/', 'ProfilesController.get')
    Route.post('/profile/', 'ProfilesController.store')
  }).middleware(AuthMiddleware.buildMiddlewareName('api'))

  Route.group(() => {
    Route.get('/genders/', 'GendersController.getAll')
  }).middleware(AuthMiddleware.buildMiddlewareName('api'))

  Route.group(() => {
    Route.get('/spotify/artists', 'SpotifyController.artists')
    Route.get('/spotify/tracks', 'SpotifyController.tracks')
    Route.get('/spotify/track-by-name', 'SpotifyController.trackByName')
  }).middleware(AuthMiddleware.buildMiddlewareName('api'))

  Route.group(() => {
    Route.get('/matches/', 'MatchesController.get')
    Route.post('/matches/mutual', 'MatchesController.mutualMatch')
    Route.get('/matches/history', 'MatchesController.history')
  }).middleware(AuthMiddleware.buildMiddlewareName('api'))
}).prefix('api')
