import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser, UserUpdate } from '../../interfaces';
import { uuid } from 'uuidv4';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    private users = [{
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "login": "TestUser",
      "version": 1,
      "createdAt": 1655000000,
      "updatedAt": 1655000000
    }];

  getUsers() {
    return this.users;
  }

  getUserById(id: string) {
    const user = this.users.find(user => user.id === id);

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

    this.users.push(newUser);

    return newUser;
  }

  updateUser(id: string, user: UserUpdate): IUser {
    const index = this.users.findIndex(user => user.id === id);

    const updatingUser: IUser = {
      login:  this.users[index].login,
      password: user.newPassword,
      version: this.users[index].version + 1,
      createdAt: this.users[index].createdAt,
      updatedAt: new Date().getTime(),
      id
    }

    this.users[index] = updatingUser;

    return updatingUser;
  }

  deleteUser(id: string) {
    const index = this.users.findIndex(user => user.id ===id);

    if (index === -1) {
      throw new NotFoundException('User not found.');
    }

    this.users.splice(index, 1);
  }
}
