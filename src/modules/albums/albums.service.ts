import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Album } from '../../interfaces';
import { uuid } from 'uuidv4';
import { CreateAlbumDto } from './dto/create-album.dto';

@Injectable()
export class AlbumsService {
    private albums = [{
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "Test",
      "year": 1991,
      "artistId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }];

  getAlbums() {
    return this.albums;
  }

  getAlbumById(id: string) {
    const album: Album = this.albums.find(album => album.id === id);

    if (!album) {
      throw new NotFoundException('Album not found.');
    }

    return album;
  }

  createAlbum(album: CreateAlbumDto): Album {
    const newAlbum: Album = {
      name: album.name,
      year: album.year,
      artistId: album.artistId || null,
      id: uuid(),
    }

    this.albums.push(newAlbum);

    return newAlbum;
  }

  updateAlbum(id: string, album: CreateAlbumDto): Album {
    const index = this.albums.findIndex(album => album.id === id);

    if (!this.albums[index]) {
      throw new NotFoundException('Album not found.');
    }

    if (typeof album.name !== 'string' || typeof album.year !== 'number') {
      throw new BadRequestException('Request body does not contain required fields');
    }

    const updatingAlbum: Album = {
      ...album,
      id
    }

    this.albums[index] = updatingAlbum;

    return updatingAlbum;
  }

  deleteAlbum(id: string) {
    const index = this.albums.findIndex(album => album.id === id);

    if (index === -1) {
      throw new NotFoundException('Album not found.');
    }

    this.albums.splice(index, 1);
  }
}
