import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post()
  addUser(
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('message') message: string,
    @Body('media') media: string,
    @Body('email') email: string,
  ): any {
    const mediaUrl = this.userService.insertUser(
      firstName,
      lastName,
      message,
      media,
      email,
    );
    return { id: mediaUrl };
  }
  @Get()
  getAllUsers() {
    return this.userService.getUsers();
  }
}
