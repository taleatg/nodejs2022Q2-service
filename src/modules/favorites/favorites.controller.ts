import {
  Controller,
  HttpCode,
  Delete,
  Get,
  Post, Param, ParseUUIDPipe,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private favoriteService: FavoritesService) {}

  @Get()
  getFavorites() {
    return this.favoriteService.getFavorites();
  }

  @Post('artist/:id')
  @HttpCode(201)
  addArtistToFavorites(@Param('id', new ParseUUIDPipe({ version: '4' })) id) {
    return this.favoriteService.addArtistToFavorites(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  deleteArtistFromFavorites(@Param('id', new ParseUUIDPipe({ version: '4' })) artistId) {
    return this.favoriteService.deleteArtistFromFavorites(artistId);
  }

  @Post('album/:id')
  @HttpCode(201)
  addAlbumToFavorites(@Param('id', new ParseUUIDPipe({ version: '4' })) id) {
    return this.favoriteService.addAlbumToFavorites(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  deleteAlbumFromFavorites(@Param('id', new ParseUUIDPipe({ version: '4' })) albumId) {
    return this.favoriteService.deleteAlbumFromFavorites(albumId);
  }

  @Post('track/:id')
  @HttpCode(201)
  addTrackToFavorites(@Param('id', new ParseUUIDPipe({ version: '4' })) id) {
    return this.favoriteService.addTrackToFavorites(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  deleteTrackFromFavorites(@Param('id', new ParseUUIDPipe({ version: '4' })) trackId) {
    return this.favoriteService.deleteTrackFromFavorites(trackId);
  }
}
