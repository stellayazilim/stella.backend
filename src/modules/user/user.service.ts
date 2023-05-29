import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserModel } from '../../schemas/user.schema';
import { UserAddDto } from './dto/user.add.dto';
import { UserUpdateDto } from './dto/user.create.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: UserModel) {}

  async AddUser(data: UserAddDto) {
    return await this.userModel.create(data).catch((e) => {
      if (e.code == 11000) throw new ConflictException();
    });
  }

  async GetUsers({ limit, skip }: { limit?: number; skip?: number }) {
    return await this.userModel
      .find({})
      .limit(limit)
      .skip(skip)
      .lean()
      .then((data) => data);
  }

  async GetUserById(id: import('mongoose').Types.ObjectId) {
    return await this.userModel
      .findById(id)
      .lean()
      .then((data) => {
        if (data == null) throw new NotFoundException();
        else return data;
      });
  }

  async UpdateUser(id: import('mongoose').Types.ObjectId, data: UserUpdateDto) {
    return await this.userModel
      .findByIdAndUpdate(id, data, { new: true })
      .lean()
      .then((data) => {
        if (data == null) throw new NotFoundException();
        else return data;
      });
  }

  async DeleteUser(id: import('mongoose').Types.ObjectId) {
    return await this.userModel.findByIdAndRemove(id).then((data) => {
      if (data == null) throw new NotFoundException();
      return;
    });
  }
}
