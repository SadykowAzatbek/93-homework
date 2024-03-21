import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistsController } from './artists/artists.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Artist, ArtistSchema} from "./schemas/artists.schema";
import { AlbumsController } from './albums/albums.controller';
import {Album, AlbumSchema} from "./schemas/albums.schema";
import { TracksController } from './track/track.controller';
import {Track, TrackSchema} from "./schemas/tracks.schema";

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/music-nest'),
    MongooseModule.forFeature([
      {name: Artist.name, schema: ArtistSchema},
      {name: Album.name, schema: AlbumSchema},
      {name: Track.name, schema: TrackSchema},
    ]),
  ],
  controllers: [AppController, ArtistsController, AlbumsController, TracksController],
  providers: [AppService],
})
export class AppModule {}
