import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserModel } from '../../../schemas/user.schema';
import { UserAddDto } from './dto/user.add.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: UserModel) {}

  async AddUser(data: UserAddDto) {
    return await this.userModel.create(data).catch((e) => {
      if (e.code == '11000') throw new ConflictException();
    });
  }
}
