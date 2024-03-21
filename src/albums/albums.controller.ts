import {Body, Controller, Delete, Get, Param, Post, Query, UploadedFile, UseInterceptors} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Album, AlbumDocument} from "../schemas/albums.schema";
import {CreateAlbumsDto} from "./create-albums.dto";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('albums')
export class AlbumsController {
  constructor(
    @InjectModel(Album.name)
    private albumModel: Model<AlbumDocument>
  ) {}

  @Get()
  getAlbums(@Query('artistId') albumId: string) {
    if (albumId) {
      return this.albumModel.find({artist: albumId});
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

    return album.save();
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    await this.albumModel.findByIdAndDelete(id);

    return 'The one album deleted successfully';
  }
}
