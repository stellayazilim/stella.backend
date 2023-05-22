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
} from '@nestjs/common';
import { TenantService } from './tenant.service';
import { StellaGuard } from 'src/common/guards/stella.guard';
import { TenantCreateDto } from './dto/tenant.create.dto';
import { TenantUpdateDto } from './dto/tenant.update.dto';
import { ParseObjectIdPipe } from 'src/common/pipes/parse.objectid.pipe';

@Controller('tenants')
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
  getTenantById(@Param('id') id: string) {
    return this.tenantService.GetById(id);
  }

  @UseGuards(StellaGuard)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Patch('tenants/:id')
  updateTenant(
    @Param('id', new ParseObjectIdPipe()) id: import('mongoose').Types.ObjectId,
    @Body() data: TenantUpdateDto,
  ) {
    return this.tenantService.Update(id, data);
  }
}
