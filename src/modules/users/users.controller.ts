import {
  Body,
  Controller,
  HttpCode,
  Param,
  Delete,
  Get,
  Post,
  Put,
  ParseUUIDPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserUpdate } from '../../interfaces';
import { User } from '../albums/user';

@Controller('user')
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  getUsers() {
    const allUsers = this.userService.getUsers();
    return allUsers.map(user => new User({ ...user }));
    // return this.userService.getUsers();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  getUserById(@Param('id') id) {
    return new User({
      ...this.userService.getUserById(id),
    });
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @HttpCode(201)
  createUser(@Body() user: CreateUserDto): User {
    return new User({
      ...this.userService.createUser(user),
    });
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  updateUser(@Param('id') id, @Body() user: UserUpdate ): User {
    return new User({
      ...this.userService.updateUser(id, user),
    })
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id', new ParseUUIDPipe({ version: '4' })) id) {
    return this.userService.deleteUser(id);
  }
}
