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

import Route from "@ioc:Adonis/Core/Route";
import AuthMiddleware from "App/Middleware/Auth";

Route.get('health', ({ response }) => response.noContent())

Route.group(() => {

  Route.group(() => {
    Route.get("/spotify", "AuthSpotifyController.authorize");
    Route.post("/spotify/callback", "AuthSpotifyController.callback");
    Route.post("/success", "AuthController.success");
    Route.post("/logout", "AuthController.logout");
  }).prefix(AuthMiddleware.buildMiddlewareName())

  Route.group(() => {
    Route.get("/", "ProfilesController.get");
    Route.post("/", "ProfilesController.store");
  })
  .prefix("profile")
  .middleware(AuthMiddleware.buildMiddlewareName("api"));

  Route.group(() => {
    Route.get("/", "GendersController.index");
  })
  .prefix("genders")
  .middleware(AuthMiddleware.buildMiddlewareName("api"));

  Route.group(() => {
    Route.get("/artists", "SpotifyController.artists");
    Route.get("/tracks", "SpotifyController.tracks");
    Route.get("/track-by-name", "SpotifyController.trackByName");
  })
  .prefix("spotify")
  .middleware(AuthMiddleware.buildMiddlewareName("api"));

  Route.group(() => {
    Route.get("/", "MatchesController.get");
    Route.post("/mutual", "MatchesController.mutualMatch");
    Route.get("/history", "MatchesController.history");
  })
  .prefix("matches")
  .middleware(AuthMiddleware.buildMiddlewareName("api"));

}).prefix("api");
