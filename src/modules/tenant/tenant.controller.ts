import {
  Controller,
  Post,
  Get,
  Body,
  ValidationPipe,
  UsePipes,
  Patch,
  Param,
  Query,
  Delete,
} from '@nestjs/common';
import { TenantService } from './tenant.service';

import { TenantCreateDto } from './dto/tenant.create.dto';
import { TenantUpdateDto } from './dto/tenant.update.dto';
import { ParseObjectIdPipe } from 'src/common/pipes/parse.objectid.pipe';

@Controller({ host: 'administrator.localhost', path: 'tenants' })
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Get()
  async getTenants(@Query() query: { skip?: number; limit?: number }) {
    return this.tenantService.GetAll(query);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  createTenant(@Body() data: TenantCreateDto) {
    return this.tenantService.Create(data);
  }

  @Get(':id')
  getTenantById(
    @Param('id', new ParseObjectIdPipe()) id: import('mongoose').Types.ObjectId,
  ) {
    return this.tenantService.GetById(id);
  }

  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Patch(':id')
  updateTenant(
    @Param('id', new ParseObjectIdPipe()) id: import('mongoose').Types.ObjectId,
    @Body() data: TenantUpdateDto,
  ) {
    return this.tenantService.UpdateById(id, data);
  }

  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Delete(':id')
  async deleteTenant(
    @Param('id', new ParseObjectIdPipe()) id: import('mongoose').Types.ObjectId,
  ) {
    await this.tenantService.DeleteById(id);
  }
}
