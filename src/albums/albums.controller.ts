import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Album, AlbumDocument} from "../schemas/albums.schema";
import {CreateAlbumsDto} from "./create-albums.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {TokenAuthGuard} from "../auth/token-auth.guard";
import {PermitGuard} from "../permit/permit.guard";

@Controller('albums')
export class AlbumsController {
  constructor(
    @InjectModel(Album.name)
    private albumModel: Model<AlbumDocument>
  ) {}

  @Get()
  getAlbums(@Query('artistId') artistId: string) {
    if (artistId) {
      return this.albumModel.find({artist: artistId});
    }

    return this.albumModel.find();
  }

  @Get(':id')
  async getOneAlbum(@Param('id') id: string) {
    const album = await this.albumModel.findById(id);

    return {
      result: album,
      message: 'album received successfully',
    };
  }

  @UseGuards(TokenAuthGuard, new PermitGuard('admin', 'user'))
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {dest: './public/uploads/albums'})
  )
  async createAlbum(
    @UploadedFile() file: Express.Multer.File,
    @Body() albumDto: CreateAlbumsDto
  ) {
    const album = new this.albumModel({
      artist: albumDto.artist,
      name: albumDto.name,
      release: albumDto.release,
      image: file ? '/uploads/albums/' + file.filename : null,
    });

    return await album.save();
  }

  @UseGuards(TokenAuthGuard, new PermitGuard('admin'))

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    await this.albumModel.findByIdAndDelete(id);

    return 'The one album deleted successfully';
  }
}
