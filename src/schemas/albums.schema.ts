import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Artist} from "./artists.schema";
import mongoose, {Document} from "mongoose";

@Schema()
export class Album {
  @Prop({ ref: Artist.name, required: true })
  artist: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  release: number;

  @Prop()
  image: string;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
export type AlbumDocument = Album & Document;