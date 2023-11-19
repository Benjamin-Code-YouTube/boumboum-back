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

Route.get('health', ({ response }) => response.noContent())

Route.group(() => {
  Route.get("/", async ({ response }) => {
    return response.json("Working.");
  });

  // SIGN IN ROUTES
  Route.get("/signin", "UsersController.redirect");

  //OAuth CALLBACK
  Route.get("/signin-callback", "UsersController.handleCallback");

  Route.post("/logout", "UsersController.logout");

  Route.group(() => {
    Route.get("/", "ProfilesController.get");
    Route.post("/", "ProfilesController.store");
  })
  .prefix("profile")
  .middleware("auth:api");

  Route.group(() => {
    Route.get("/", "GendersController.index");
  })
  .prefix("genders")
  .middleware("auth:api");

  Route.group(() => {
    Route.get("/artists", "SpotifyController.artists");
    Route.get("/tracks", "SpotifyController.tracks");
    Route.get("/track-by-name", "SpotifyController.trackByName");
  })
  .prefix("spotify")
  .middleware("auth:api");

  Route.group(() => {
    /* potential matches */
    Route.get("/", "MatchesController.get");

    /* mark match */
    Route.post("/mutual", "MatchesController.mutualMatch");

    /* get mutual match history */
    Route.get("/history", "MatchesController.history");
  })
  .prefix("matches")
  .middleware("auth:api");

}).prefix("api");
