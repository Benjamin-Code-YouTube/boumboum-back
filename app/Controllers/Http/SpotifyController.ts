import type {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import SpotifyService from "App/Services/SpotifyService";
import {inject} from "@adonisjs/fold";

@inject()
export default class SpotifyController {

  constructor(private spotifyService: SpotifyService) {
  }

  public async artists({auth}: HttpContextContract) {
    const user = await auth.authenticate();
    const userId = user.id;
    const topArtists = await this.spotifyService.getArtists(userId);
    const savedArtists = await this.spotifyService.saveArtists(userId, topArtists);
    return savedArtists;
  }

  public async tracks({auth}: HttpContextContract) {
    const user = await auth.authenticate();
    const userId = user.id;
    const topTracks = await this.spotifyService.getTracks(userId);
    const mappdTracks = topTracks?.map((track) => {
      return {
        // image: track?.preview_url,
        // uri: track.uri,
        popularity: track.popularity,
        name: track.name,
        trackId: track.id,
        album: track?.albun?.name,
        // artists: artists,
      };
    });
    // const savedTracks = await SpotifyService.saveTracks(userId, topTracks);

    return mappdTracks;
  }

  public async trackByName({request, auth}: HttpContextContract) {
    const user = await auth.authenticate();
    const userId = user.id;
    const {name} = request.qs()

    const tracks = await this.spotifyService.getTracksByName(userId, name)

    const mappedTracks = tracks?.map((track) => {
      return {
        uri: track.uri,
        popularity: track.popularity,
        name: track.name,
        trackId: track.id,
        album: track?.album?.name,
      }
    })

    return {
      status: true,
      data: mappedTracks
    }
  }

}
