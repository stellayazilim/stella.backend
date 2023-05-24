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
import { RoleService } from './role.service';
import { ParseObjectIdPipe } from 'src/common/pipes/parse.objectid.pipe';
import { RoleAddDto } from './dto/role.add.dto';
import { RoleUpdateDto } from './dto/role.update.dto';

@Controller({ host: 'administrator.localhost', path: 'roles' })
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async getRoles(@Query() query: { limit?: number; skip?: number }) {
    return await this.roleService.GetAllRoles(query);
  }

  @Get(':id')
  async getRoleById(
    @Param('id', new ParseObjectIdPipe()) id: import('mongoose').Types.ObjectId,
  ) {
    return await this.roleService.GetRoleById(id);
  }
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async addRole(@Body() data: RoleAddDto) {
    return this.roleService.AddRole(data);
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Delete(':id')
  async deleteRole(
    @Param('id', new ParseObjectIdPipe()) id: import('mongoose').Types.ObjectId,
  ) {
    await this.roleService.DeleteRole(id);
    return;
  }

  @Patch('id')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  updateRole(
    @Param('id', new ParseObjectIdPipe()) id: import('mongoose').Types.ObjectId,
    @Body() data: RoleUpdateDto,
  ) {
    return this.roleService.UpdateRole(id, data);
  }
}
