import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role, RoleModel } from 'src/schemas/stella/role.schema';
import { RoleAddDto } from './dto/role.add.dto';
import { RoleUpdateDto } from './dto/role.update.dto';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role.name) private readonly roleModel: RoleModel) {}

  async GetAllRoles({ limit, skip }: { limit?: number; skip?: number }) {
    return await this.roleModel.find({}).limit(limit).skip(skip).lean();
  }

  async GetRoleById(id: import('mongoose').Types.ObjectId) {
    return await this.roleModel
      .findById(id)
      .lean()
      .then((data) => {
        if (data == null) throw new NotFoundException();

        return data;
      });
  }
  async AddRole(data: RoleAddDto) {
    return await this.roleModel.create(data).catch((e) => {
      if (e.code == 11000) throw new ConflictException();
    });
  }

  async UpdateRole(id: import('mongoose').Types.ObjectId, data: RoleUpdateDto) {
    return await this.roleModel
      .findByIdAndUpdate(id, data, { new: true })
      .lean();
  }

  async DeleteRole(id: import('mongoose').Types.ObjectId) {
    await this.roleModel.findByIdAndRemove(id).then((data) => {
      if (data == null) throw new NotFoundException();
      return;
    });
  }
}
