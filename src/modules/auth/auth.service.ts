import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role, RoleModel } from 'src/schemas/stella/role.schema';
import { User, UserDocument, UserModel } from 'src/schemas/user.schema';
import { pbkdf2Sync, randomBytes } from 'crypto';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  private readonly;
  constructor(
    private readonly configService: ConfigService,
    @InjectModel(User.name) private readonly userModel: UserModel,
    @InjectModel(Role.name) private readonly roleModel: RoleModel,
  ) {
    console.log(randomBytes(16).toString('hex'));
    //284ab006b79595dc9ddf3ffe8811c164
    //6c4d135d309de553bbf35c24331ea1ef
  }

  async GetUserByCredentials(email: string, password: string) {
    let user = await this.userModel.findOne({ email }).lean();

    if (user == null) throw new UnauthorizedException();

    const hash = pbkdf2Sync(
      password,
      this.configService.get<string>('PASSWORD_HASH'),
      10000,
      64,
      'sha512',
    );

    if (user.password !== hash.toString('hex'))
      throw new UnauthorizedException();
    ({ password, ...user as Partial<UserDocument> } = user);

    return user;
  }
}
