import {Body, Controller, Delete, Get, Param, Post, Query, UseGuards} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Track, TrackDocument} from "../schemas/tracks.schema";
import {Model} from "mongoose";
import {CreateTracksDto} from "./create-tracks.dto";
import {TokenAuthGuard} from "../auth/token-auth.guard";
import {PermitGuard} from "../permit/permit.guard";

@Controller('tracks')
export class TracksController {
  constructor(
    @InjectModel(Track.name)
    private trackModel: Model<TrackDocument>
  ) {}

  @Get()
  getTracks(@Query('albumId') albumId: string) {
    if (albumId) {
      return this.trackModel.find({album: albumId});
    }

    return this.trackModel.find();
  }

  @UseGuards(TokenAuthGuard, new PermitGuard('admin', 'user'))
  @Post()
  async createTrack(@Body() trackData: CreateTracksDto) {
    const track = new this.trackModel({
      album: trackData.album,
      name: trackData.name,
      duration: trackData.duration,
      number: trackData.number,
    });

    return await track.save();
  }

  @UseGuards(TokenAuthGuard, new PermitGuard('admin'))
  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    await this.trackModel.findByIdAndDelete(id);

    return 'The one track deleted successfully';
  }
}
