import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tenant, TenantModel } from 'src/schemas/tenant.schema';
import { TenantCreateDto } from 'src/modules/tenant/dto/tenant.create.dto';
import { TenantUpdateDto } from 'src/modules/tenant/dto/tenant.update.dto';
import { Types } from 'mongoose';

@Injectable()
export class TenantService {
  constructor(
    @InjectModel(Tenant.name) private readonly tenantModel: TenantModel,
  ) {}

  async Create(data: TenantCreateDto) {
    return await this.tenantModel
      .create({
        ...data,
      })

      .then((data) => data)
      .catch((e) => {
        if (e.code == 11000) throw new ConflictException();
      });
  }

  async GetTenants() {
    return await this.tenantModel.find({}).then((data) => data);
  }

  async UpdateTenant(
    id: import('mongoose').Types.ObjectId,
    data: TenantUpdateDto,
  ) {
    console.log(data, id);
    return;
  }
}
