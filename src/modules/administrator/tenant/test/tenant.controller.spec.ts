import { Test, TestingModule } from '@nestjs/testing';
import { TenantController } from '../tenant.controller';
import { TenantService } from '../tenant.service';
import { TenantCreateDto } from '../dto/tenant.create.dto';
import {
  tenantIdStub,
  tenantStub,
  tenantWithIdStub,
} from '../__STUBS__/tenant.stub';
import { TenantUpdateDto } from '../dto/tenant.update.dto';
import { TenantDocument } from 'src/schemas/stella/tenant.schema';

describe('TenantControler', () => {
  let tenantController: TenantController;
  let app: TestingModule;
  let tenantService: TenantService;

  const mockTenantService = {
    Create: (data: TenantCreateDto) => data,
    GetAll: (query: {
      limit?: number | undefined;
      skip?: number | undefined;
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
    UpdateById(_id: import('mongoose').Types.ObjectId, data: TenantUpdateDto) {
      return { ...tenantWithIdStub(), ...data };
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    DeleteById(_id: import('mongoose').Types.ObjectId) {
      return {
        ...tenantWithIdStub(),
        isDeleted: true,
      } as unknown as Partial<TenantDocument>;
    },
  };
  beforeEach(async () => {
    app = await Test.createTestingModule({
      controllers: [TenantController],
      providers: [
        {
          provide: TenantService,
          useValue: mockTenantService,
        },
      ],
    }).compile();
    await app.init();
    tenantController = app.get<TenantController>(TenantController);
    tenantService = app.get<TenantService>(TenantService);
  });
  it('should defined', () => {
    expect(tenantController).toBeDefined();
  });

  describe('get /tenants', () => {
    beforeAll(() => {
      jest.clearAllMocks();
    });
    it('should return all tenants', () => {
      expect(
        tenantController.getTenants({ limit: undefined, skip: undefined }),
      ).resolves.toMatchObject([tenantStub(), tenantStub()]);
    });

    it('should limit output', () => {
      expect(tenantController.getTenants({ limit: 1 })).resolves.toHaveLength(
        1,
      );
    });

    it('should skip output', async () => {
      const result = tenantController.getTenants({
        skip: 1,
      });

      expect(result).resolves.toHaveLength(1);
    });
  });

  describe('get /tentants/:id', () => {
    it('should get tenant by id', async () => {
      const spy = jest.spyOn(tenantService, 'GetById');
      const tenant = await tenantController.getTenantById(tenantIdStub());

      expect(tenant).toMatchObject(tenantWithIdStub());
      expect(spy).toBeCalledWith(tenantIdStub());
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('patch /tenants/:id', () => {
    it('should update tenant by id', () => {
      const tenant = tenantController.updateTenant(tenantIdStub(), {
        company: 'test',
      } as unknown as TenantUpdateDto);

      expect(tenant).toMatchObject({ ...tenantWithIdStub(), company: 'test' });
    });
  });

  describe('delete tenant', () => {
    let tenant;
    beforeAll(() => {
      tenant = tenantController.deleteTenant(
        tenantIdStub() as import('mongoose').Types.ObjectId,
      );
    });
    it('should delete tenant and resolves', async () => {
      expect(tenant).resolves.toBe(undefined);
    });

    it('should not throw an error on susscessfull delete', () => {
      expect(tenant).resolves.not.toThrow();
    });
  });
});
