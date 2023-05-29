import { ConflictException, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { TenantService } from '../tenant.service';
import { TenantCreateDto } from '../dto/tenant.create.dto';
import { TenantUpdateDto } from '../dto/tenant.update.dto';

describe('TenantService', () => {
  let tenantService: TenantService;
  let mockTenantModel: any;

  beforeEach(() => {
    mockTenantModel = {
      create: jest.fn(),
      find: jest.fn(),
      findById: jest.fn(),
      findByIdAndUpdate: jest.fn(),
    };
    tenantService = new TenantService(mockTenantModel);
  });

  describe('Create', () => {
    it('should create a new tenant', async () => {
      const createDto = {
        /* createDto verileri buraya girin */
      };
      const mockCreatedTenant = {
        /* mock oluşturulan tenant verileri buraya girin */
      };
      mockTenantModel.create.mockResolvedValue(mockCreatedTenant);

      const result = await tenantService.Create(
        createDto as unknown as TenantCreateDto,
      );

      expect(mockTenantModel.create).toHaveBeenCalledWith(createDto);
      expect(result).toBe(mockCreatedTenant);
    });

    it('should throw ConflictException if a duplicate key error occurs', async () => {
      const createDto = {
        /* createDto verileri buraya girin */
      };
      const mockError = { code: 11000 };
      mockTenantModel.create.mockRejectedValue(mockError);

      await expect(
        tenantService.Create(createDto as TenantCreateDto),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('GetAll', () => {
    it('should get all tenants', async () => {
      const mockTenants = [
        {
          _id: '6469a1f65dfe850a92a0b303',
          company: 'Yourcompany',
          host: 'yourcompany.com',
          isCompany: true,
          phone: '+905555555555',
        },
      ];
      const mockQuery = {
        populate: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue(mockTenants),
      };
      mockTenantModel.find.mockReturnValue(mockQuery);

      const result = await tenantService.GetAll({ skip: 0, limit: 10 });

      expect(mockTenantModel.find).toHaveBeenCalledWith();
      expect(mockQuery.populate).toHaveBeenCalledWith('address');
      expect(mockQuery.limit).toHaveBeenCalledWith(10);
      expect(mockQuery.skip).toHaveBeenCalledWith(0);
      expect(result).toBe(mockTenants);
    });
  });

  describe('GetById', () => {
    it('should get a tenant by ID', async () => {
      const tenantId = new Types.ObjectId();
      const mockTenant = {
        _id: '6469a1f65dfe850a92a0b303',
        company: 'Yourcompany',
        host: 'yourcompany.com',
        isCompany: true,
        phone: '+905555555555',
      };
      const mockPopulatedTenant = {
        _id: tenantId,
        ...mockTenant,
      };
      mockTenantModel.findById.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue(mockTenant),
      });

      const result = await tenantService.GetById(tenantId);

      expect(mockTenantModel.findById).toHaveBeenCalledWith(tenantId);
      expect(result).toEqual(mockPopulatedTenant);
    });
  });

  describe('Update Tenant', () => {
    const mockTenantId: import('mongoose').Types.ObjectId =
      new Types.ObjectId();

    const mockTenant = {
      name: 'stella',
      company: 'stella',
      isCompany: true,
      phone: '+905438559800',
      email: 'administrator@stellasoft.tech',
      hostname: 'stellasoft.tech',
      address: {
        country: 'Turkiye',
        city: 'Tekirdag',
        province: 'Corlu',
        addressLines: ['Ali pasa mah'],
        zipcode: '49580',
      },
    };
    const mockTenantUpdateDto: TenantUpdateDto = {
      name: 'Test',
    };
    it('should update tenant', () => {
      mockTenantModel.findByIdAndUpdate.mockReturnValue({
        lean: jest
          .fn()
          .mockResolvedValue(
            Object.assign(
              {},
              { _id: mockTenantId },
              mockTenant,
              mockTenantUpdateDto,
            ),
          ),
      });

      const result = tenantService.UpdateById(
        mockTenantId,
        mockTenantUpdateDto,
      );
      expect(mockTenantModel.findByIdAndUpdate).toHaveBeenCalledWith(
        mockTenantId,
        mockTenantUpdateDto,
        { new: true },
      );
      expect(result).resolves.toMatchObject(
        Object.assign(
          {},
          { _id: mockTenantId },
          mockTenant,
          mockTenantUpdateDto,
        ),
      );
    });

    it('should throw NotFoundException if tenant not found', () => {
      mockTenantModel.findByIdAndUpdate.mockReturnValue({
        lean: jest.fn().mockResolvedValue(null),
      });
      const result = tenantService.UpdateById(
        mockTenantId,
        mockTenantUpdateDto,
      );
      expect(mockTenantModel.findByIdAndUpdate).toHaveBeenCalledWith(
        mockTenantId,
        mockTenantUpdateDto,
        { new: true },
      );

      expect(result).rejects.toThrowError(new NotFoundException());
    });
  });

  describe('delete tenant', () => {
    const mockTenantId: import('mongoose').Types.ObjectId =
      new Types.ObjectId();

    const mockTenant = {
      name: 'stella',
      company: 'stella',
      isCompany: true,
      phone: '+905438559800',
      email: 'administrator@stellasoft.tech',
      hostname: 'stellasoft.tech',
      address: {
        country: 'Turkiye',
        city: 'Tekirdag',
        province: 'Corlu',
        addressLines: ['Ali pasa mah'],
        zipcode: '49580',
      },
    };
    const mockTenantUpdateDto: TenantUpdateDto = {
      name: 'Test',
    };

    it('should delete tenant', () => {
      mockTenantModel.findByIdAndUpdate.mockReturnValue({
        lean: jest
          .fn()
          .mockResolvedValue(
            Object.assign(
              {},
              { _id: mockTenantId, isDeleted: true },
              mockTenant,
              mockTenantUpdateDto,
            ),
          ),
      });

      const result = tenantService.DeleteById(mockTenantId);

      expect(mockTenantModel.findByIdAndUpdate).toHaveBeenCalledWith(
        mockTenantId,
        { isDeleted: true },
      );

      expect(result).resolves.toMatchObject(
        expect.objectContaining({ isDeleted: true }),
      );
    });

    it('should throw NotFoundException', () => {
      mockTenantModel.findByIdAndUpdate.mockReturnValue({
        lean: jest.fn().mockResolvedValue(null),
      });

      const result = tenantService.DeleteById(mockTenantId);

      expect(mockTenantModel.findByIdAndUpdate).toHaveBeenCalledWith(
        mockTenantId,
        { isDeleted: true },
      );
      expect(result).rejects.toThrowError(new NotFoundException());
    });
  });
});
