import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { TenantModule } from '../tenant.module';
import { MongooseModule } from 'src/modules/mongoose/mongoose.module';
import { Tenant, TenantModel } from 'src/schemas/stella/tenant.schema';
import { TenantService } from '../tenant.service';
import { TenantController } from '../tenant.controller';
describe('Role module', () => {
  let tenantModule: TenantModule;
  let tenantModel: TenantModel;
  let tenantService: TenantService;
  let tenantController: TenantController;
  beforeEach(async () => {
    const app = await Test.createTestingModule({
      imports: [TenantModule],
    })
      .overrideProvider(getModelToken(Tenant.name))
      .useValue({
        find: jest.fn(),
        findById: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        findByIdAndRemove: jest.fn(),
      })
      .compile();

    tenantModule = app.get<TenantModule>(TenantModule);
    tenantModel = app.get<TenantModel>(getModelToken(Tenant.name));
    tenantService = app.get<TenantService>(TenantService);
    tenantController = app.get<TenantController>(TenantController);
  });

  it('should defined', () => {
    expect(tenantModule).toBeDefined();
  });

  it('should have roleController defined', () => {
    expect(tenantController).toBeDefined();
  });

  it('should have roleModel defined', () => {
    expect(tenantModel).toBeDefined();
  });

  it('should have roleService defined', () => {
    expect(tenantService).toBeDefined();
  });
});
