import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Track } from '../../interfaces';
import { uuid } from 'uuidv4';
import { CreateTrackDto } from './dto/create-tracks.dto';
import { FavoritesService } from '../favorites/favorites.service';

@Injectable()
export class TracksService {
  static tracks: Track[];

  constructor() {
    TracksService.tracks = [];
  }

  getTracks() {
    return TracksService.tracks;
  }

  getTrackById(id: string) {
    const track: Track = TracksService.tracks.find(track => track.id === id);

    if (!track) {
      throw new NotFoundException('Track not found.');
    }

    return track;
  }

  createTrack(track: CreateTrackDto): Track {
    const newTrack: Track = {
      name: track.name,
      duration: track.duration,
      artistId: track.artistId || null,
      albumId: track.albumId || null,
      id: uuid(),
    }

    TracksService.tracks.push(newTrack);

    return newTrack;
  }

  updateTrack(id: string, track: CreateTrackDto): Track {
    const index = TracksService.tracks.findIndex(track => track.id === id);

    if (!TracksService.tracks[index]) {
      throw new NotFoundException('Track not found.');
    }

    if (typeof track.name !== 'string' || typeof track.duration !== 'number') {
      throw new BadRequestException('Request body does not contain required fields');
    }

    const updatingTrack: Track = {
      ...track,
      id
    }

    TracksService.tracks[index] = updatingTrack;

    return updatingTrack;
  }

  deleteTrack(id: string) {
    const index = TracksService.tracks.findIndex(track => track.id === id);

    if (index === -1) {
      throw new NotFoundException('Track not found.');
    }

    TracksService.tracks.splice(index, 1);
    this.deleteEverywhere(id);
  }

  deleteEverywhere(id: string) {
    FavoritesService.favorites.tracks.map((track, index) => {
      if (track === id) {
        FavoritesService.favorites.tracks.splice(index, 1);
      }
    })
  }
}
