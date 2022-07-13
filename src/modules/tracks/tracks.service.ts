import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Track } from '../../interfaces';
import { uuid } from 'uuidv4';
import { CreateTrackDto } from './dto/create-tracks.dto';

@Injectable()
export class TracksService {
  private tracks = [];

  getTracks() {
    return this.tracks;
  }

  getTrackById(id: string) {
    const track: Track = this.tracks.find(track => track.id === id);

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

    this.tracks.push(newTrack);

    return newTrack;
  }

  updateTrack(id: string, track: CreateTrackDto): Track {
    const index = this.tracks.findIndex(track => track.id === id);

    if (!this.tracks[index]) {
      throw new NotFoundException('Track not found.');
    }

    if (typeof track.name !== 'string' || typeof track.duration !== 'number') {
      throw new BadRequestException('Request body does not contain required fields');
    }

    const updatingTrack: Track = {
      ...track,
      id
    }

    this.tracks[index] = updatingTrack;

    return updatingTrack;
  }

  deleteTrack(id: string) {
    const index = this.tracks.findIndex(track => track.id === id);

    if (index === -1) {
      throw new NotFoundException('Track not found.');
    }

    this.tracks.splice(index, 1);
  }
}
