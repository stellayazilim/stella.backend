import {
  Controller,
  Get,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { ParseObjectIdPipe } from 'src/common/pipes/parse.objectid.pipe';

@Controller({ host: 'administrator.localhost', path: 'roles' })
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  test() {
    return 'hell';
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Get(':id')
  async deleteRole(
    @Param('id', new ParseObjectIdPipe()) id: import('mongoose').Types.ObjectId,
  ) {
    return await this.roleService.DeleteRole(id);
  }
}
