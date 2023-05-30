import { Test } from '@nestjs/testing';
import { RoleService } from '../role.service';
import { getModelToken } from '@nestjs/mongoose';
import { Role, RoleModel } from 'src/schemas/role.schema';
import { RoleModule } from '../role.module';
import { RoleController } from '../role.controller';
describe('Role module', () => {
  let roleModel: RoleModel;
  let roleController: RoleController;
  let roleService: RoleService;
  let roleModule: RoleModule;
  beforeEach(async () => {
    const app = await Test.createTestingModule({
      imports: [RoleModule],
    })
      .overrideProvider(getModelToken(Role.name))
      .useValue({
        find: jest.fn(),
        findById: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        findByIdAndRemove: jest.fn(),
      })
      .compile();

    roleModule = app.get<RoleModule>(RoleModule);
    roleController = app.get<RoleController>(RoleController);
    roleService = app.get<RoleService>(RoleService);
    roleModel = app.get<RoleModel>(getModelToken(Role.name));
  });

  it('should defined', () => {
    expect(roleModule).toBeDefined();
  });

  it('should have roleController defined', () => {
    expect(roleController).toBeDefined();
  });

  it('should have roleModel defined', () => {
    expect(roleModel).toBeDefined();
  });

  it('should have roleService defined', () => {
    expect(roleService).toBeDefined();
  });
});
