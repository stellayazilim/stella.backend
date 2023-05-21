import { Test, TestingModule } from '@nestjs/testing';
import { TenantController } from '../tenant.controller';
import { TenantService } from '../tenant.service';
import { TenantCreateDto } from '../dto/tenant.create.dto';

describe('TenantControler', () => {
  let tenantController: TenantController;
  beforeEach(async () => {
    const app = await Test.createTestingModule({
      controllers: [TenantController],
      providers: [TenantService],
    })
      .overrideProvider(TenantService)
      .useValue({
        Create: (data: TenantCreateDto) => data,
      })
      .compile();

    tenantController = app.get<TenantController>(TenantController);
  });
  it('should defined', () => {
    expect(tenantController).toBeDefined();
  });
});
