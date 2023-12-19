import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import SpotifyService from "App/Services/SpotifyService";

export default class SpotifyController {
  public async artists({ response, auth }: HttpContextContract) {
    try {
      const userId = auth.user?.id;
      const topArtists = await SpotifyService.getArtists(userId);
      const savedArtists = await SpotifyService.saveArtists(userId, topArtists);
      return response.json(savedArtists);
    } catch (err) {
      console.log("err", err);
      throw err
    }
  }

  public async tracks({ response, auth }: HttpContextContract) {
    try {
      const userId = auth.user?.id;
      const topTracks = await SpotifyService.getTracks(userId);
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

      return response.json(mappdTracks);
    } catch (err) {
      console.log("err", err);
      throw err
    }
  }

  public async trackByName({request, response, auth}: HttpContextContract) {
    try {
      const userId = auth.user?.id;
      const { name } = request.qs()

      const tracks = await SpotifyService.getTracksByName(userId, name)

      const mappedTracks = tracks?.map((track) => {
        return  {
          uri: track.uri,
          popularity: track.popularity,
          name: track.name,
          trackId: track.id,
          album: track?.album?.name,
        }
      })

      return response.json({
        status: true,
        data: mappedTracks
      })
    } catch(err) {
      return response.json({
        status: false,
        message: "Error fetching track's"
      })
    }
  }

}
