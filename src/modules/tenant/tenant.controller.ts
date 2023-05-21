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
} from '@nestjs/common';
import { TenantService } from './tenant.service';
import { StellaGuard } from 'src/common/guards/stella.guard';
import { TenantCreateDto } from './dto/tenant.create.dto';
import { TenantUpdateDto } from './dto/tenant.update.dto';
import { ParseObjectIdPipe } from 'src/common/pipes/parse.objectid.pipe';

@Controller()
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Get()
  sayHello() {
    return 'hello';
  }

  @UseGuards(StellaGuard)
  @Get('tenants')
  createTenant1() {
    return this.tenantService.GetTenants();
  }

  @UseGuards(StellaGuard)
  @Post('tenants')
  @UsePipes(new ValidationPipe({ transform: true }))
  cereateTenant(@Body() data: TenantCreateDto) {
    return this.tenantService.Create(data);
  }

  @UseGuards(StellaGuard)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Patch('tenants/:id')
  updateTenant(
    @Param('id', new ParseObjectIdPipe()) id: import('mongoose').Types.ObjectId,
    @Body() data: TenantUpdateDto,
  ) {
    return this.tenantService.UpdateTenant(id, data);
  }
}
