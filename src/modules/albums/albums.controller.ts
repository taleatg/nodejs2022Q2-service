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
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { Album } from '../../interfaces';

@Controller('album')
export class AlbumsController {
  constructor(private albumService: AlbumsService) {}

  @Get()
  getAlbums() {
    return this.albumService.getAlbums();
  }

  @Get(':id')
  getAlbumById(@Param('id', new ParseUUIDPipe({ version: '4' })) id) {
    return this.albumService.getAlbumById(id);
  }

  @Post()
  @HttpCode(201)
  createAlbum(@Body() album: CreateAlbumDto): Album {
    return this.albumService.createAlbum(album);
  }

  @Put(':id')
  updateAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id,
    @Body() album: Album): Album {
    return this.albumService.updateAlbum(id, album);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id) {
    return this.albumService.deleteAlbum(id);
  }
}
