import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Tenant, TenantModel } from 'src/schemas/tenant.schema';
import { TenantModule } from '../tenant.module';
import { TenantService } from '../tenant.service';
import { TenantController } from '../tenant.controller';

describe('Role module', () => {
  let tenantModule: TenantModule;
  let tenantController: TenantController;
  let tenantModel: TenantModel;
  let tenantService: TenantService;
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
    tenantController = app.get<TenantController>(TenantController);
    tenantService = app.get<TenantService>(TenantService);
    tenantModel = app.get<TenantModel>(getModelToken(Tenant.name));
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
