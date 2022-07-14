import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Artist } from '../../interfaces';
import { CreateArtistDto } from './dto/create-artists.dto';
import { uuid } from 'uuidv4';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';
import { FavoritesService } from '../favorites/favorites.service';

@Injectable()
export class ArtistsService {
  static artists: Artist[];

  constructor() {
    ArtistsService.artists = [];
  }

  getArtists() {
    return ArtistsService.artists;
  }

  getArtistById(id: string) {
    const artist: Artist = ArtistsService.artists.find(artist => artist.id === id);

    if (!artist) {
      throw new NotFoundException('Artist not found.');
    }

    return artist;
  }

  createArtist(artist: CreateArtistDto): Artist {
    const newArtist: Artist = {
      ...artist,
      id: uuid(),
    }

    ArtistsService.artists.push(newArtist);

    return newArtist;
  }

  updateArtist(id: string, artist: Artist): Artist {
    const index = ArtistsService.artists.findIndex(artist => artist.id === id);

    if (!ArtistsService.artists[index]) {
      throw new NotFoundException('Artist not found.');
    }

    if (typeof artist.name !== 'string' || typeof artist.grammy !== 'boolean') {
      throw new BadRequestException('Request body does not contain required fields');
    }

    const updatingArtist: Artist = {
      ...artist,
      id
    }

    ArtistsService.artists[index] = updatingArtist;

    return updatingArtist;
  }

  deleteArtist(id: string) {
    const index = ArtistsService.artists.findIndex(artist => artist.id ===id);

    if (index === -1) {
      throw new NotFoundException('Artist not found.');
    }

    ArtistsService.artists.splice(index, 1);
    this.deleteEverywhere(id);
  }

  deleteEverywhere(id: string) {
    FavoritesService.favorites.artists.map((artist, index) => {

      if (artist === id) {
        FavoritesService.favorites.artists.splice(index, 1);
      }
    });

    AlbumsService.albums.map(album => {
      if (album.artistId === id) {
        album.artistId = null;
      }
    });

    TracksService.tracks.map(track => {
      if (track.artistId === id) {
        track.artistId = null;
      }
    });
  }
}
