import {
  Controller,
  Post,
  Get,
  UseGuards,
  Body,
  ValidationPipe,
  UsePipes,
  Patch,
  Param,
  Query,
  Delete,
} from '@nestjs/common';
import { TenantService } from './tenant.service';
import { StellaGuard } from 'src/common/guards/stella.guard';
import { TenantCreateDto } from './dto/tenant.create.dto';
import { TenantUpdateDto } from './dto/tenant.update.dto';
import { ParseObjectIdPipe } from 'src/common/pipes/parse.objectid.pipe';

@Controller({ host: 'administrator.localhost', path: 'tenants' })
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @UseGuards(StellaGuard)
  @Get()
  getTenants(@Query() query: { skip: number; limit: number }) {
    return this.tenantService.Get(query);
  }

  @UseGuards(StellaGuard)
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  createTenant(@Body() data: TenantCreateDto) {
    return this.tenantService.Create(data);
  }

  @UseGuards(StellaGuard)
  @Get(':id')
  getTenantById(
    @Param('id', new ParseObjectIdPipe()) id: import('mongoose').Types.ObjectId,
  ) {
    return this.tenantService.GetById(id);
  }

  @UseGuards(StellaGuard)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Patch(':id')
  updateTenant(
    @Param('id', new ParseObjectIdPipe()) id: import('mongoose').Types.ObjectId,
    @Body() data: TenantUpdateDto,
  ) {
    return this.tenantService.UpdateById(id, data);
  }

  @UseGuards(StellaGuard)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Delete(':id')
  async deleteTenant(
    @Param('id', new ParseObjectIdPipe()) id: import('mongoose').Types.ObjectId,
  ) {
    await this.tenantService.DeleteById(id);
  }
}
