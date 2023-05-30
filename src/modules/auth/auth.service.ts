import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role, RoleModel } from 'src/schemas/stella/role.schema';
import { User, UserDocument, UserModel } from 'src/schemas/stella/user.schema';
import { pbkdf2Sync, randomBytes } from 'crypto';
import { ConfigService } from '@nestjs/config';
import { FlattenMaps } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  private readonly;
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: UserModel,
    @InjectModel(Role.name) private readonly roleModel: RoleModel,
  ) {}

  async LoginByCredentials(
    email: string,
    password: string,
  ): Promise<Omit<FlattenMaps<User>, 'password'>> {
    let user: Partial<FlattenMaps<User>> = await this.userModel
      .findOne({ email })
      .populate('role')
      .select('+password')
      .lean();

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

    // remove password password
    ({ password, ...user } = user);
    return <Omit<FlattenMaps<User>, 'password'>>user;
  }

  async SignTokens(
    user: Partial<FlattenMaps<UserDocument>>,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return await Promise.all([
      {
        accessToken: this.jwtService.sign(
          {
            sub: user.email,
            _id: user._id,
            role: user.role,
          },
          {
            expiresIn: '15m',
            secret: this.configService.getOrThrow<string>('JWT_ACCESS_SECRET'),
          },
        ),
      },
      {
        refreshToken: this.jwtService.sign(
          {
            sub: user.email,
            _id: user._id,
          },
          {
            expiresIn: '15d',
            secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
          },
        ),
      },
    ]).then((data) => Object.assign({}, ...Object.values(data)));
  }
}
