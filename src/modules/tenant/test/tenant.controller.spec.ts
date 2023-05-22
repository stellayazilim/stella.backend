import { Test, TestingModule } from '@nestjs/testing';
import { TenantController } from '../tenant.controller';
import { TenantService } from '../tenant.service';
import { TenantCreateDto } from '../dto/tenant.create.dto';
import {
  tenantIdStub,
  tenantStub,
  tenantWithIdStub,
} from '../__STUBS__/tenant.stub';

describe('TenantControler', () => {
  let tenantController: TenantController;
  let app: TestingModule;
  beforeEach(async () => {
    app = await Test.createTestingModule({
      controllers: [TenantController],
      providers: [TenantService],
    })
      .overrideProvider(TenantService)
      .useValue({
        Create: (data: TenantCreateDto) => data,
        Get: (query: {
          limit: number | undefined;
          skip: number | undefined;
        }) => {
          if (query.limit || query.skip) {
            return [tenantStub(), tenantStub()].slice(
              query.skip || 0,
              (query.limit || 2) + (query.skip || 0),
            );
          }
          return [tenantStub(), tenantStub()];
        },

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        GetById(id: import('mongoose').Types.ObjectId) {
          return tenantWithIdStub();
        },
      })
      .compile();
    await app.init();
    tenantController = app.get<TenantController>(TenantController);
  });
  it('should defined', () => {
    expect(tenantController).toBeDefined();
  });

  describe('get /tenants', () => {
    it('should return all tenants', () => {
      expect(
        tenantController.getTenants({ limit: undefined, skip: undefined }),
      ).toEqual(expect.arrayContaining([tenantStub(), tenantStub()]));
    });

    it('should limit output', () => {
      expect(
        tenantController.getTenants({ limit: 1, skip: undefined }),
      ).toHaveLength(1);
    });

    it('should skip output', () => {
      expect(
        tenantController.getTenants({ limit: undefined, skip: 1 }),
      ).toHaveLength(1);
    });
  });

  describe('get /tentants/:id', () => {
    it('should get tenant by id', () => {
      const tenant = tenantController.getTenantById(tenantIdStub());

      expect(tenant).toMatchObject(tenantWithIdStub());
    });
  });
});
