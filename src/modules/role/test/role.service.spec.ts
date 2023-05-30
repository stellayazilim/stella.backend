import { Test } from '@nestjs/testing';
import { RoleService } from '../role.service';
import { getModelToken } from '@nestjs/mongoose';
import { Role } from 'src/schemas/role.schema';
import { RoleAddDto } from '../dto/role.add.dto';
import { Types } from 'mongoose';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { RoleUpdateDto } from '../dto/role.update.dto';
describe('Role service', () => {
  let mockRoleModel: any;
  let roleService: RoleService;
  beforeEach(async () => {
    mockRoleModel = {
      create: jest.fn(),
      find: jest.fn(),
      findById: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      findByIdAndRemove: jest.fn(),
    };

    const app = await Test.createTestingModule({
      providers: [
        RoleService,
        {
          provide: getModelToken(Role.name),
          useValue: mockRoleModel,
        },
      ],
    }).compile();

    roleService = app.get<RoleService>(RoleService);
  });

  it('should defined', () => {
    expect(roleService).toBeDefined();
  });

  const mockRoles = [
    {
      _id: '6469a1f65dfe850a92a0b303',
      name: 'administrator',
      description: 'root admin role',
      perms: [2, 5, 4],
    },
    {
      _id: '6469a1f65dfe850a92a0b303',
      name: 'administrator',
      describe: 'root admin role',
      perms: [2, 3, 1],
    },
  ];
  describe('AddRole', () => {
    it('should add roles', () => {
      const roleDto: RoleAddDto = {
        name: 'administrator',
        description: 'root admin role',
        perms: [2, 3, 4],
      };
      const mockCreatedDto = {
        _id: '6469a1f65dfe850a92a0b303',
        name: 'administrator',
        describe: 'root admin role',
        perms: [2, 3, 4],
      };

      mockRoleModel.create.mockResolvedValue(mockCreatedDto);
      const result = roleService.AddRole(roleDto);
      expect(mockRoleModel.create).toBeCalledWith(roleDto);
      expect(result).resolves.toBe(mockCreatedDto);
    });
  });

  describe('GetRoles', () => {
    it('should get all roles', () => {
      const mockQuery = {
        limit: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue(mockRoles),
      };
      mockRoleModel.find.mockReturnValue(mockQuery);
      const result = roleService.GetAllRoles({ skip: 0, limit: 10 });

      expect(mockRoleModel.find).toHaveBeenCalled();
      expect(mockQuery.limit).toBeCalledWith(10);
      expect(mockQuery.skip).toBeCalledWith(0);
      expect(mockQuery.lean).toHaveBeenCalled();
      expect(result).resolves.toBe(mockRoles);
    });
  });

  describe('GetRole', () => {
    let mockRoleId;
    beforeEach(() => {
      mockRoleId = new Types.ObjectId('6469a1f65dfe850a92a0b303');
    });
    it('should get role by id', async () => {
      const mockPopulatedRole = () => ({
        _id: mockRoleId,
        name: 'admin',
        description: 'admin role',
        perms: [1, 2, 3, 4],
      });
      mockRoleModel.findById.mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockPopulatedRole()),
      });
      const result = roleService.GetRoleById(mockRoleId);

      expect(mockRoleModel.findById).toHaveBeenCalledWith(mockRoleId);
      expect(result).resolves.not.toThrowError();
      expect(result).resolves.toMatchObject(mockPopulatedRole());
    });

    it('should throw NotFoundExeption if role does not exist on db', () => {
      mockRoleModel.findById.mockReturnValue({
        lean: jest.fn().mockResolvedValue(null),
      });
      const result = roleService.GetRoleById(new Types.ObjectId());

      expect(result).rejects.toThrow(new NotFoundException());
    });
  });

  describe('AddRole', () => {
    const mockRoleId = new Types.ObjectId('6469a1f65dfe850a92a0b303');
    const addRoleDto = {
      name: 'admin',
      description: 'admin role',
      perms: [1, 2, 3, 4],
    };
    const mockAddedRole = {
      _id: mockRoleId,
      name: 'admin',
      description: 'admin role',
      perms: [1, 2, 3, 4],
    };
    it('should add role', () => {
      mockRoleModel.create.mockResolvedValue(mockAddedRole);
      const result = roleService.AddRole(addRoleDto);
      expect(mockRoleModel.create).toHaveBeenLastCalledWith(addRoleDto);
      expect(result).resolves.toMatchObject(mockAddedRole);
    });

    it('should throw ConflictException if a duplicate key error occurs', () => {
      const mockError = { code: 11000 };
      mockRoleModel.create.mockRejectedValue(mockError);

      expect(roleService.AddRole(addRoleDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });
  describe('UpdateRole', () => {
    const mockRoleId = new Types.ObjectId('6469a1f65dfe850a92a0b303');
    let mockPopulatedRole;
    let mockUpdateDto;
    beforeEach(() => {
      mockUpdateDto = (): RoleUpdateDto => ({
        name: 'admin1',
        description: 'admin role1',
        perms: [1, 2, 3, 4],
      });
      mockPopulatedRole = {
        _id: mockRoleId,
        name: 'admin1',
        description: 'admin role1',
        perms: [1, 2, 3, 4],
      };
    });
    it('should update role', () => {
      const mockQuery = {
        lean: jest
          .fn()
          .mockResolvedValue({ ...mockPopulatedRole, ...RoleUpdateDto }),
      };
      mockRoleModel.findByIdAndUpdate.mockReturnValue(mockQuery);
      const result = roleService.UpdateRole(mockRoleId, mockUpdateDto);
      expect(mockRoleModel.findByIdAndUpdate).toHaveBeenCalledWith(
        mockRoleId,
        mockUpdateDto,
        { new: true },
      );
      expect(result).resolves.toMatchObject(mockPopulatedRole);
    });

    it('should throw NotFoundException if role does not exist', () => {
      mockRoleModel.findByIdAndUpdate.mockReturnValue({
        lean: jest.fn().mockResolvedValue(null),
      });
      const result = roleService.UpdateRole(mockRoleId, mockUpdateDto);
      expect(mockRoleModel.findByIdAndUpdate).toHaveBeenCalledWith(
        mockRoleId,
        mockUpdateDto,
        { new: true },
      );
      expect(result).rejects.toThrowError(new NotFoundException());
    });
  });

  describe('RemoveRole', () => {
    const mockRoleId = new Types.ObjectId('6469a1f65dfe850a92a0b303');
    const mockPopulatedRole = {
      name: 'admin1',
      description: 'admin role1',
      perms: [1, 2, 3, 4],
    };
    it('should remove role', () => {
      mockRoleModel.findByIdAndRemove.mockResolvedValue(mockPopulatedRole);

      const result = roleService.DeleteRole(mockRoleId);
      expect(mockRoleModel.findByIdAndRemove).toBeCalledWith(mockRoleId);
      expect(result).resolves.toBe(undefined);
    });

    it('should throw NotFound exeption if role does not exist', () => {
      mockRoleModel.findByIdAndRemove.mockResolvedValue(null);

      const result = roleService.DeleteRole(mockRoleId);
      expect(result).rejects.toThrow(new NotFoundException());
    });
  });
});
