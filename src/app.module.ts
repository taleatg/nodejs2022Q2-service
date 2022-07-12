import { Module } from '@nestjs/common';
import { AlbumsModule } from './modules/albums/albums.module';
import { ArtistsModule } from './modules/artists/artists.module';

@Module({
  imports: [AlbumsModule, ArtistsModule]
})
export class AppModule {}
