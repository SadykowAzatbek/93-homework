import {Body, Controller, Get, Post, Req, UnprocessableEntityException, UseGuards} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "../schemas/user.schema";
import mongoose, {Model} from "mongoose";
import {RegisterUserDto} from "./register-user.dto";
import {AuthGuard} from "@nestjs/passport";
import {Request} from "express";
import {TokenAuthGuard} from "../auth/token-auth.guard";

@Controller('users')
export class UsersController {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>
  ) {}

  @Post()
  async registerUser(@Body() registerUserDto: RegisterUserDto) {
    try {
      const user = new this.userModel({
        email: registerUserDto.email,
        password: registerUserDto.password,
        displayName: registerUserDto.displayName,
      });

      user.generateToken();

      return user.save();
    } catch (err) {
      if (err instanceof mongoose.Error.ValidationError) {
        throw new UnprocessableEntityException(err);
      }

      throw err;
    }
  }

  @UseGuards(AuthGuard('local'))
  @Post('sessions')
  async login(@Req() req: Request) {
    return req.user;
  }
}
