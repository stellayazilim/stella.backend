import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserAddDto } from './dto/user.add.dto';
import { UserService } from './user.service';
import { ParseObjectIdPipe } from 'src/common/pipes/parse.objectid.pipe';
import { UserUpdateDto } from './dto/user.create.dto';

@Controller({ host: 'administrator.localhost', path: 'users' })
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async addUser(@Body() data: UserAddDto) {
    return this.userService.AddUser(data);
  }

  @Get()
  async getUsers(@Query() query: { limit?: number; skip?: number }) {
    return this.userService.GetUsers(query);
  }

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getUserById(
    @Param('id', new ParseObjectIdPipe()) id: import('mongoose').Types.ObjectId,
  ) {
    return this.userService.GetUserById(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateUser(
    @Param('id', new ParseObjectIdPipe()) id: import('mongoose').Types.ObjectId,
    @Body() data: UserUpdateDto,
  ) {
    return this.userService.UpdateUser(id, data);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async deleteUser(
    @Param('id', new ParseObjectIdPipe()) id: import('mongoose').Types.ObjectId,
  ) {
    return this.userService.DeleteUser(id);
  }
}
