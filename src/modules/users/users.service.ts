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
    private users: IUser[] = [];

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

  updateUser(id: string, passwords: UpdatePasswordDto) {
    const index = this.users.findIndex(user => user.id === id);

    if (index === -1) {
      throw new NotFoundException('User not found.');
    }

    if ( this.users[index]?.password !== passwords.oldPassword ) {
      throw new ForbiddenException('Should correctly update user password match');
    }


    const updatingUser: IUser = {
      login:  this.users[index].login,
      password: passwords.newPassword,
      version: this.users[index].version + 1,
      createdAt: this.users[index].createdAt,
      updatedAt: new Date().getTime(),
      id
    }

    this.users[index] = updatingUser;

    return updatingUser;
  }

  deleteUser(id: string) {
    const index = this.users.findIndex(user => user.id === id);

    if (index === -1) {
      throw new NotFoundException('User not found.');
    }

    this.users.splice(index, 1);
  }
}
