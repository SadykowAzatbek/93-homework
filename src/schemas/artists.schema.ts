import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";

@Schema()
export class Artist {
  @Prop({required: true, unique: true})
  name: string;

  @Prop()
  description: string;

  @Prop()
  image: string;
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
export type ArtistDocument = Artist & Document;