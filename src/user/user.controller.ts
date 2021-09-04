import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import { CreateUserDto } from '@app/user/dto/create-user.dto';
import { UserResponseInterface } from '@app/user/types/userResponse.interface';
import { AuthUserDto } from '@app/user/dto/auth-user.dto';
import { Request } from 'express';
import { ExpressRequestInterface } from '@app/types/express-request.interface';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Post('users/login')
  @UsePipes(new ValidationPipe())
  async authUser(
    @Body('user') authUserDto: AuthUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.authUser(authUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Get('user')
  async currentUser(
    @Req() request: ExpressRequestInterface,
  ): Promise<UserResponseInterface> {
    return this.userService.buildUserResponse(request.user);
  }
}
