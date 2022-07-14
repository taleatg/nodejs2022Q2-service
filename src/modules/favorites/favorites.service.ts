import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { Favorites } from '../../interfaces';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';

@Injectable()
export class FavoritesService {
  static favorites: Favorites;

  constructor() {
    FavoritesService.favorites = {
      artists: [],
      albums: [],
      tracks: [],
    };
  };

  getFavorites() {
    const favorites = {
      artists: [],
      albums: [],
      tracks: [],
    }

    favorites.artists = FavoritesService.favorites.artists.map(artistId =>
      ArtistsService.artists.find(artist => artist.id === artistId)
    );

    favorites.albums = FavoritesService.favorites.albums.map(albumId =>
      AlbumsService.albums.find(album => album.id === albumId)
    );

    favorites.tracks = FavoritesService.favorites.tracks.map(trackId =>
      TracksService.tracks.find(track => track.id === trackId)
    );

    return favorites;
  }

  addArtistToFavorites(id: string) {
    const index = ArtistsService.artists.findIndex(artist => artist.id === id);

    if (index === -1) {
      throw new UnprocessableEntityException('Artist doesn\'t exist')
    }

    FavoritesService.favorites.artists.push(id);
  }

  deleteArtistFromFavorites(artistId: string) {
    const index = FavoritesService.favorites.artists.findIndex(id => artistId === id);

    if (index === -1) {
      throw new NotFoundException('ArtistId not found.');
    }

    FavoritesService.favorites.artists.splice(index, 1);
  }

  addAlbumToFavorites(id: string) {
    const index = AlbumsService.albums.findIndex(album => album.id === id);

    if (index === -1) {
      throw new UnprocessableEntityException('Album doesn\'t exist')
    }
    FavoritesService.favorites.albums.push(id);
  }

  deleteAlbumFromFavorites(albumId: string) {
    const index = FavoritesService.favorites.albums.findIndex(id => albumId === id);

    if (index === -1) {
      throw new NotFoundException('AlbumId not found.');
    }

    FavoritesService.favorites.albums.splice(index, 1);
  }

  addTrackToFavorites(id: string) {
    const index = TracksService.tracks.findIndex(track => track.id === id);

    if (index === -1) {
      throw new UnprocessableEntityException('Track doesn\'t exist')
    }

    FavoritesService.favorites.tracks.push(id);
  }

  deleteTrackFromFavorites(trackId: string) {
    const index = FavoritesService.favorites.tracks.findIndex(id => trackId === id);

    if (index === -1) {
      throw new NotFoundException('TrackId not found.');
    }

    FavoritesService.favorites.tracks.splice(index, 1);
  }
}
