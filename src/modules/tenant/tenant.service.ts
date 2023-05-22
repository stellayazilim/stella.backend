import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tenant, TenantModel } from 'src/schemas/stella/tenant.schema';
import { TenantCreateDto } from 'src/modules/tenant/dto/tenant.create.dto';
import { TenantUpdateDto } from 'src/modules/tenant/dto/tenant.update.dto';

@Injectable()
export class TenantService {
  constructor(
    @InjectModel(Tenant.name) private readonly tenantModel: TenantModel,
  ) {}

  async Create(data: TenantCreateDto) {
    return await this.tenantModel
      .create(data)
      .then((data) => data)
      .catch((e) => {
        if (e.code == 11000) throw new ConflictException();
      });
  }

  async Get({ skip, limit }: { skip?: number; limit?: number }) {
    return await this.tenantModel
      .find()
      .limit(limit)
      .skip(skip)
      .then((data) => data);
  }

  async GetById(id: string) {
    return await this.tenantModel.findById(id);
  }
  async Update(id: import('mongoose').Types.ObjectId, data: TenantUpdateDto) {
    console.log(data, id);
    return;
  }
}
