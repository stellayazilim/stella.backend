import { Test, TestingModule } from '@nestjs/testing';
import { TenantService } from '../tenant.service';
import { getModelToken } from '@nestjs/mongoose';
import { Tenant } from 'src/schemas/stella/tenant.schema';
import { tenantStub } from '../__STUBS__/tenant.stub';
import { TenantCreateDto } from '../dto/tenant.create.dto';
import { MockTenantModel } from '../__MOCKS__/TenantModel';
describe('AppController', () => {
  let tenantService: TenantService;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        TenantService,
        {
          provide: getModelToken(Tenant.name),
          useClass: MockTenantModel,
        },
      ],
    }).compile();

    tenantService = app.get<TenantService>(TenantService);
  });

  describe('Tenant Service', () => {
    it('should be defined', () => {
      expect(tenantService).toBeDefined();
    });

    it('should be instance of tenant service', () => {
      expect(tenantService).toBeInstanceOf(TenantService);
    });

    describe('createTenant', () => {
      it('should TenantModel.create() called', async () => {
        expect(
          tenantService.Create({
            ...(tenantStub() as unknown as TenantCreateDto),
          }),
        ).resolves.toMatchObject({
          _id: '646a97180cb6a35a81925bdd',
          contact: { phoneNumber: ['+905555555555'] },
          host: 'yourcompany.com',
          isCompany: true,
          name: 'Yourcompany',
        });
      });
    });
  });
});
