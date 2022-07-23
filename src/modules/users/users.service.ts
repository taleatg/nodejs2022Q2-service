import {
  ForbiddenException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { IUser } from '../../interfaces';
import { uuid } from 'uuidv4';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UsersService {
  private static users: IUser[];

  constructor() {
    UsersService.users = [];
  }

  getUsers() {
    return UsersService.users;
  }

  getUserById(id: string) {
    const user = UsersService.users.find(user => user.id === id);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }

  createUser(user: CreateUserDto): IUser {
    const newUser: IUser = {
      ...user,
      version: 1,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      id: uuid(),
    }

    UsersService.users.push(newUser);

    return newUser;
  }

  updateUser(id: string, passwords: UpdatePasswordDto) {
    const index = UsersService.users.findIndex(user => user.id === id);

    if (index === -1) {
      throw new NotFoundException('User not found.');
    }

    if ( UsersService.users[index]?.password !== passwords.oldPassword ) {
      throw new ForbiddenException('Should correctly update user password match');
    }


    const updatingUser: IUser = {
      login:  UsersService.users[index].login,
      password: passwords.newPassword,
      version: UsersService.users[index].version + 1,
      createdAt: UsersService.users[index].createdAt,
      updatedAt: new Date().getTime(),
      id
    }

    UsersService.users[index] = updatingUser;

    return updatingUser;
  }

  deleteUser(id: string) {
    const index = UsersService.users.findIndex(user => user.id === id);

    if (index === -1) {
      throw new NotFoundException('User not found.');
    }

    UsersService.users.splice(index, 1);
  }
}
