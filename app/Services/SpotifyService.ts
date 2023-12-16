import Env from "@ioc:Adonis/Core/Env";

import Artist from "App/Models/Artist";
import Genre from "App/Models/Genre";
import SocialToken from "App/Models/SocialToken";
import Track from "App/Models/Track";
import axios from "axios";
import * as console from "console";
import UnAuthorizedException from "App/Exceptions/UnAuthorizedException";
import TechnicalException from "App/Exceptions/TechnicalException";

const axiosInstance = axios.create({
  baseURL: Env.get("SPOTIFY_URL"),
  timeout: 1000,
})
axiosInstance.interceptors.response.use(
  response => {
    // Any status code that lies within the range of 2xx causes this function to trigger
    return response;
  },
  error => {
    if (error.response.status === 401) {
      throw new UnAuthorizedException()
    }
    throw new TechnicalException()
  },
);

export default class SpotifyService {
  public static async getArtists(userId) {
    const social = await SocialToken.query().where("user_id", userId).first();

    const resp = await axiosInstance.get('/me/top/artists', {
      headers: {
        Authorization: `Bearer ${social?.token}`,
      },
    });

    return resp?.data?.items;
  }

  public static async getTracks(userId) {
    const social = await SocialToken.query().where("user_id", userId).first();
    const resp = await axiosInstance.get(
      '/me/top/tracks?time_range=medium_term&limit=5',
      {
        headers: {
          Authorization: `Bearer ${social?.token}`,
        },
      }
    );
    return resp?.data?.items;
  }

  public static async saveArtists(userId, artists) {
    try {
      for (let artist of artists) {
        //store artists
        const newArtist = new Artist();
        newArtist.userId = userId;
        newArtist.name = artist?.name;
        newArtist.type = artist?.type;
        newArtist.popularity = artist?.popularity;
        newArtist.uri = artist?.uri;
        newArtist.spotifyArtistId = artist?.id;
        newArtist.artistImage = artist?.images ? artist?.images[0]?.url : null;

        artist.genres = artist.genres?.map((name) => {
          let genre = new Genre();
          genre.name = name;
          return genre;
        });

        //store artists genres
        await newArtist.related("genres").saveMany(artist.genres);
      }
      return {
        status: true,
      };
    } catch (err) {
      console.log("FAILIURE");
      console.log("err", err);
      return {
        status: false,
      };
    }
  }

  public static async saveTracks(userId, tracks) {
    try {
      for (let track of tracks) {
        //store tracks
        const newTrack = new Track();
        newTrack.userId = userId;
        newTrack.uri = track.uri;
        newTrack.popularity = track.popularity;
        newTrack.name = track.name;
        newTrack.trackId = track.id;
        newTrack.album = track?.album?.name;
        await newTrack.save();
      }
      return {
        status: true,
      };
    } catch (err) {
      return {
        status: false,
      };
    }
  }

  public static async getTracksByIds(userId, trackIds) {
    const commaSeparatedIds = trackIds.join(",");
    const social = await SocialToken.query().where("user_id", userId).first();
    const resp = await axiosInstance.get(
      `/tracks?ids=${commaSeparatedIds}`,
      {
        headers: {
          Authorization: `Bearer ${social?.token}`,
        },
      }
    );
    return resp?.data?.tracks;
  }

  public static getTracksData(tracks) {
    const mappdTracks = tracks?.map((track) => {
      return {
        popularity: track.popularity,
        name: track.name,
        trackId: track.id,
        album: track?.albun?.name,
      };
    });

    return mappdTracks;
  }

  public static async updateFavorityTrack(userId, trackIds) {
    try {
      const markFavorite = await Track.query()
        .where("user_id", userId)
        .whereIn("track_id", trackIds)
        .update({
          favorite: 1,
        });

      return {
        status: true,
        data: markFavorite,
      };
    } catch (err) {
      return {
        status: false,
      };
    }
  }

  public static async getTracksByName(userId, name) {
    const social = await SocialToken.query().where("user_id", userId).first();
    const resp = await axiosInstance.get(
      `/search?q=track:${name}&type=track`,
      {
        headers: {
          Authorization: `Bearer ${social?.token}`,
        },
      }
    );
    return resp?.data?.tracks?.items;
  }
}
