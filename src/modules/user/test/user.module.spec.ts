import { User, UserModel } from 'src/schemas/user.schema';
import { UserModule } from '../user.module';
import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { MockUserModel } from './__mocks__/user.model';

describe('User(Administrator) module', () => {
  let userModule: UserModule;
  let userController: UserController;
  let userModel: UserModel;
  let userService: UserService;
  beforeEach(async () => {
    const app = await Test.createTestingModule({
      imports: [UserModule],
    })
      .overrideProvider(getModelToken(User.name))
      .useValue(MockUserModel)
      .compile();

    userModule = app.get<UserModule>(UserModule);
    userController = app.get<UserController>(UserController);
    userService = app.get<UserService>(UserService);
    userModel = app.get<UserModel>(getModelToken(User.name));
  });

  it('should defined', () => {
    expect(userModule).toBeDefined();
  });

  it('should have roleController defined', () => {
    expect(userController).toBeDefined();
  });

  it('should have roleModel defined', () => {
    expect(userModel).toBeDefined();
  });

  it('should have roleService defined', () => {
    expect(userService).toBeDefined();
  });
});
