import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { Artist } from '../../interfaces';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artists.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private artistService: ArtistsService) {}

  @Get()
  getArtists() {
    return this.artistService.getArtists();
  }

  @Get(':id')
  getArtistById(@Param('id') id) {
    return this.artistService.getArtistById(id);
  }

  @Post()
  @HttpCode(201)
  createArtist(@Body() artist: CreateArtistDto): Artist {
    return this.artistService.createArtist(artist);
  }

  @Put(':id')
  updateArtist(@Param('id') id, @Body() artist: Artist): Artist {
    return this.artistService.updateArtist(id, artist);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id) {
    return this.artistService.deleteArtist(id);
  }
}
