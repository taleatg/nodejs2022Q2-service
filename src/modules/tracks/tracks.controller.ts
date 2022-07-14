import {
  Body,
  Controller,
  HttpCode,
  Param,
  Delete,
  Get,
  Post,
  Put,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-tracks.dto';
import { Track } from '../../interfaces';

@Controller('track')
export class TracksController {
  constructor(private trackService: TracksService) {}

  @Get()
  getTracks() {
    return this.trackService.getTracks();
  }

  @Get(':id')
  getTrackById(@Param('id', new ParseUUIDPipe({ version: '4' })) id) {
    return this.trackService.getTrackById(id);
  }

  @Post()
  @HttpCode(201)
  createTrack(@Body() track: CreateTrackDto): Track {
    return this.trackService.createTrack(track);
  }

  @Put(':id')
  updateTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id,
    @Body() track: Track): Track {
    return this.trackService.updateTrack(id, track);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id) {
    return this.trackService.deleteTrack(id);
  }
}
