import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {User} from 'src/schemas/user.schema';

@Injectable()
export class PermitGuard implements CanActivate {
  private readonly roles: string[];
  constructor(
    @InjectModel(User.name)
    ...roles: string[]
  ) {
    this.roles = roles;
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.user) {
      return false;
    }

    if (!this.roles.includes(request.user.role)) {
      return false;
    }

    return true;
  }
}
