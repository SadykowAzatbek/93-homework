import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose, {Document} from "mongoose";
import {Album} from "./albums.schema";

@Schema()
export class Track {
  @Prop({ ref: Album.name, required: true })
  album: mongoose.Schema.Types.ObjectId;

  @Prop({required: true})
  name: string;

  @Prop()
  duration: string;

  @Prop({required: true})
  number: number;
}

export const TrackSchema = SchemaFactory.createForClass(Track);
export type TrackDocument = Track & Document;