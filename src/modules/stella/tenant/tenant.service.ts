import {
  Injectable,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tenant, TenantModel } from 'src/schemas/stella/tenant.schema';
import { TenantCreateDto } from 'src/modules/stella/tenant/dto/tenant.create.dto';
import { TenantUpdateDto } from 'src/modules/stella/tenant/dto/tenant.update.dto';
import { Types } from 'mongoose';

@Injectable()
export class TenantService {
  constructor(
    @InjectModel(Tenant.name) private readonly tenantModel: TenantModel,
  ) {}

  async Create(data: TenantCreateDto) {
    return await this.tenantModel
      .create(data)
      .then((data) => {
        console.log(data);

        return data;
      })
      .catch((e) => {
        console.log(e);
        if (e.code == 11000) throw new ConflictException();
      });
  }

  async Get({ skip, limit }: { skip?: number; limit?: number }) {
    return await this.tenantModel
      .find()
      .populate('address')
      .limit(limit)
      .skip(skip)
      .lean();
  }

  async GetById(id: Types.ObjectId) {
    return await this.tenantModel
      .findById(id)
      .populate('addresses')
      .lean()
      .then((data) => ({
        ...data,
        addresses: `http://localhost:3000/tenants/${data._id}/addresses`,
      }));
  }
  async UpdateById(
    id: import('mongoose').Types.ObjectId,
    data: TenantUpdateDto,
  ) {
    return await this.tenantModel
      .findOneAndUpdate(id, data, { new: true })
      .then((data) => data)
      .catch(() => {
        throw new BadRequestException();
      });
  }

  async DeleteById(id: import('mongoose').Types.ObjectId) {
    return this.tenantModel
      .findByIdAndUpdate(id, { isDeleted: true })
      .catch(() => {
        throw new BadRequestException();
      });
  }
}
