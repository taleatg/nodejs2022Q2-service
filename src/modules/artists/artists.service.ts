import { Injectable, NotFoundException } from '@nestjs/common';
import { Artist } from '../../interfaces';
import { CreateArtistDto } from './dto/create-artists.dto';
import { uuid } from 'uuidv4';

@Injectable()
export class ArtistsService {
  private artists = [{
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "name": "Freddie Mercury",
    "grammy": false
  }];

  getArtists() {
    return this.artists;
  }

  getArtistById(id: string) {
    const artist: Artist = this.artists.find(artist => artist.id === id);

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

    this.artists.push(newArtist);

    return newArtist;
  }

  updateArtist(id: string, artist: Artist): Artist {
    const updatingArtist: Artist = {
      ...artist,
      id
    }

    const index = this.artists.findIndex(artist => artist.id === id);
    this.artists[index] = updatingArtist;

    return updatingArtist;
  }

  deleteArtist(id: string) {
    const index = this.artists.findIndex(artist => artist.id ===id);

    if (index === -1) {
      throw new NotFoundException('Artist not found.');
    }

    this.artists.splice(index, 1);
  }
}
