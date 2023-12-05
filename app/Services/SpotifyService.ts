import Env from "@ioc:Adonis/Core/Env";

import Artist from "App/Models/Artist";
import Genre from "App/Models/Genre";
import SocialToken from "App/Models/SocialToken";
import Track from "App/Models/Track";
import Axios from "axios";

export default class SpotifyService {
  public static async getArtists(userId) {
    const SPOTIFY_URL = Env.get("SPOTIFY_URL");
    const social = await SocialToken.query().where("user_id", userId).first();

    const resp = await Axios.get(`${SPOTIFY_URL}/me/top/artists`, {
      headers: {
        Authorization: `Bearer ${social?.token}`,
      },
    });

    return resp?.data?.items;
  }

  public static async getTracks(userId) {
    const SPOTIFY_URL = Env.get("SPOTIFY_URL");
    const social = await SocialToken.query().where("user_id", userId).first();
    const resp = await Axios.get(
      `${SPOTIFY_URL}/me/top/tracks?time_range=long_term`,
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

        // await newArtist.save()
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
        newTrack.trackImage = track?.album?.images[0].url;
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
    const SPOTIFY_URL = Env.get("SPOTIFY_URL");

    const commaSeparatedIds = trackIds.join(",");
    const social = await SocialToken.query().where("user_id", userId).first();
    const resp = await Axios.get(
      `${SPOTIFY_URL}/tracks?ids=${commaSeparatedIds}`,
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
      // const artists = track?.artists?.map((artist) => {
      //   return {
      //     // userId: userId,
      //     name: artist.name,
      //     popularity: artist.popularity,
      //     uri: artist.uri,
      //     followers: artist?.followers?.total,
      //     // genres: artist?.genres,
      //     // image: artist?.images[0]?.url,
      //     // type: "track",
      //   };
      // });
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
    const SPOTIFY_URL = Env.get("SPOTIFY_URL");
    const social = await SocialToken.query().where("user_id", userId).first();
    const resp = await Axios.get(
      `${SPOTIFY_URL}/search?q=track:${name}&type=track`,
      {
        headers: {
          Authorization: `Bearer ${social?.token}`,
        },
      }
    );
    return resp?.data?.tracks?.items;
  }
}
