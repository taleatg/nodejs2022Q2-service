import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Album } from '../../interfaces';
import { uuid } from 'uuidv4';
import { CreateAlbumDto } from './dto/create-album.dto';
import { TracksService } from '../tracks/tracks.service';
import { FavoritesService } from '../favorites/favorites.service';

@Injectable()
export class AlbumsService {
  static albums: Album[];

  constructor() {
    AlbumsService.albums = [];
  }

  getAlbums() {
    return AlbumsService.albums;
  }

  getAlbumById(id: string) {
    const album: Album = AlbumsService.albums.find(album => album.id === id);

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

    AlbumsService.albums.push(newAlbum);

    return newAlbum;
  }

  updateAlbum(id: string, album: CreateAlbumDto): Album {
    const index = AlbumsService.albums.findIndex(album => album.id === id);

    if (!AlbumsService.albums[index]) {
      throw new NotFoundException('Album not found.');
    }

    if (typeof album.name !== 'string' || typeof album.year !== 'number') {
      throw new BadRequestException('Request body does not contain required fields');
    }

    const updatingAlbum: Album = {
      ...album,
      id
    }

    AlbumsService.albums[index] = updatingAlbum;

    return updatingAlbum;
  }

  deleteAlbum(id: string) {
    const index = AlbumsService.albums.findIndex(album => album.id === id);

    if (index === -1) {
      throw new NotFoundException('Album not found.');
    }

    AlbumsService.albums.splice(index, 1);
    this.deleteEverywhere(id);
  }

  deleteEverywhere(id: string) {
    FavoritesService.favorites.albums.map((album, index) => {
      if (album === id) {
        FavoritesService.favorites.albums.splice(index, 1);
      }
    });

    TracksService.tracks.map(track => {
      if (track.albumId === id) {
        track.albumId = null;
      }
    });
  }
}
