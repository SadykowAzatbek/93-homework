import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Artist, ArtistDocument} from "../schemas/artists.schema";
import {Model} from "mongoose";
import {CreateArtistsDto} from "./create-artists.dto";

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

    return artist;
  }

  @Post()
  async createArtist(@Body() artistDto: CreateArtistsDto){
    return await this.artistModel.create({
      name: artistDto.name,
      description: artistDto.description,
    });
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    await this.artistModel.findByIdAndDelete(id);

    return 'The one artist deleted successfully';
  }
}
