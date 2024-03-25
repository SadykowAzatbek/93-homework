import {Body, Controller, Delete, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Artist, ArtistDocument} from "../schemas/artists.schema";
import {Model} from "mongoose";
import {CreateArtistsDto} from "./create-artists.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {PermitGuard} from "../permit/permit.guard";
import {TokenAuthGuard} from "../auth/token-auth.guard";

@Controller('artists')
export class ArtistsController {
  constructor(
    @InjectModel(Artist.name)
    private artistModel: Model<ArtistDocument>
  ) {

  }
  @Get()
  getAll() {
    return this.artistModel.find();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const artist = await this.artistModel.findById(id);

    return {
      message: 'artist received successfully',
      result: artist,
    };
  }

  @UseGuards(TokenAuthGuard, new PermitGuard('admin', 'user'))
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {dest: './public/uploads/artists'})
  )
  async createArtist(
    @UploadedFile() file: Express.Multer.File,
    @Body() artistDto: CreateArtistsDto
  ) {
    const artist = new this.artistModel({
      name: artistDto.name,
      description: artistDto.description,
      image: file ? '/uploads/artists/' + file.filename : null,
    });

    return await artist.save();
  }

  @UseGuards(TokenAuthGuard, new PermitGuard('admin'))
  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    await this.artistModel.findByIdAndDelete(id);

    return 'The one artist deleted successfully';
  }
}
