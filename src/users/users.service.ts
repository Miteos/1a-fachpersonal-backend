import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  users: User[] = [];

  insertUser(
    firstName: string,
    lastName: string,
    email: string,
    message: string,
    media: string,
  ) {
    const userId = uuidv4();
    const newUser = new User(
      userId,
      firstName,
      lastName,
      email,
      message,
      media,
    );
    this.users.push(newUser);
    return userId;
  }
  getUsers() {
    return [...this.users];
  }
}
