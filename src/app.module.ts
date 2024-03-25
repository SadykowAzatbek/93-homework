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
import {User, UserSchema} from "./schemas/user.schema";
import {UsersController} from "./users/users.controller";
import { AuthService } from './auth/auth.service';
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "./auth/local.strategy";
import {TokenAuthGuard} from "./auth/token-auth.guard";
import {PermitGuard} from "./permit/permit.guard";

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/music-nest'),
    MongooseModule.forFeature([
      {name: Artist.name, schema: ArtistSchema},
      {name: Album.name, schema: AlbumSchema},
      {name: Track.name, schema: TrackSchema},
      {name: User.name, schema: UserSchema},
    ]),
    PassportModule,
  ],
  controllers: [AppController, ArtistsController, AlbumsController, TracksController, UsersController],
  providers: [AppService, AuthService, LocalStrategy, TokenAuthGuard, PermitGuard],
})
export class AppModule {}
