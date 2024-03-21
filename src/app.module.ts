import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistsController } from './artists/artists.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Artist, ArtistSchema} from "./schemas/artists.schema";
import { AlbumsController } from './albums/albums.controller';
import {Album, AlbumSchema} from "./schemas/albums.schema";

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/music-nest'),
    MongooseModule.forFeature([
      {name: Artist.name, schema: ArtistSchema},
      {name: Album.name, schema: AlbumSchema},
    ]),
  ],
  controllers: [AppController, ArtistsController, AlbumsController],
  providers: [AppService],
})
export class AppModule {}
