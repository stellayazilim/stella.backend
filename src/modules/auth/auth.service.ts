import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role, RoleModel } from 'src/schemas/stella/role.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(Role.name) private readonly roleModel: RoleModel) {}
}
