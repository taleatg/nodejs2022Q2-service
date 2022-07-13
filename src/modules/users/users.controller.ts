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
import { User } from './user';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('user')
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  getUsers() {
    const allUsers = this.userService.getUsers();
    return allUsers.map(user => new User({ ...user }));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  getUserById(@Param('id', new ParseUUIDPipe({ version: '4' })) id) {
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
  updateUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id,
    @Body() passwords: UpdatePasswordDto ): User {
    return new User({
      ...this.userService.updateUser(id, passwords),
    })
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id', new ParseUUIDPipe({ version: '4' })) id) {
    return this.userService.deleteUser(id);
  }
}
