import {
  Injectable,
  ConflictException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tenant, TenantModel } from 'src/schemas/stella/tenant.schema';
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
      .create(data)
      .then((data) => {
        return data;
      })
      .catch((e) => {
        if (e.code == 11000) throw new ConflictException();
      });
  }

  async GetAll({ skip, limit }: { skip?: number; limit?: number }) {
    return await this.tenantModel
      .find()
      .populate('address')
      .limit(limit)
      .skip(skip)
      .lean();
  }

  async GetById(id: Types.ObjectId) {
    return await this.tenantModel.findById(id).populate('addresses').lean();
  }
  async UpdateById(
    id: import('mongoose').Types.ObjectId,
    data: TenantUpdateDto,
  ) {
    return await this.tenantModel
      .findByIdAndUpdate(id, data, { new: true })
      .lean()
      .then((data) => {
        if (data == null) throw new NotFoundException();
        return data;
      });
  }

  async DeleteById(id: import('mongoose').Types.ObjectId) {
    return this.tenantModel
      .findByIdAndUpdate(id, { isDeleted: true })
      .lean()
      .then((data) => {
        if (data == null) throw new NotFoundException();
        return data;
      });
  }
}
