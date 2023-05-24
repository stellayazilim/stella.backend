import { Types } from 'mongoose';
import { RoleAddDto } from '../dto/role.add.dto';
import { RoleService } from '../role.service';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { RoleController } from '../role.controller';
import { RoleUpdateDto } from '../dto/role.update.dto';

describe('Role Controller', () => {
  let roleController: RoleController;
  let roleService: RoleService;
  const mockRoles = [
    {
      _id: new Types.ObjectId('6469a1f65dfe850a92a0b303'),
      name: 'administrator',
      description: 'root admin role',
      perms: [2, 5, 4],
    },
    {
      _id: new Types.ObjectId('6469a1f65dfe850a92a0b304'),
      name: 'administrator',
      describe: 'root admin role',
      perms: [2, 3, 1],
    },
  ];
  const mockRoleService = {
    AddRole: jest
      .fn()
      .mockImplementation((data: RoleAddDto) => ({
        ...data,
        _id: new Types.ObjectId(),
      }))
      .mockRejectedValue(new ConflictException()),
    GetAllRoles: jest.fn().mockResolvedValue(mockRoles),
    GetRoleById: jest
      .fn()
      .mockImplementation((id: import('mongoose').Types.ObjectId) => {
        const data = mockRoles.find(
          (role) => role._id.toHexString() == id.toHexString(),
        );

        if (data) return data;
        throw new NotFoundException();
      }),
    DeleteRole: jest
      .fn()
      .mockImplementation((id: import('mongoose').Types.ObjectId) => {
        if (id.toHexString() == '6469a1f65dfe850a92a0b303') return;

        throw new NotFoundException();
      }),

    UpdateRole: jest
      .fn()
      .mockImplementation(
        async (id: import('mongoose').Types.ObjectId, data: RoleUpdateDto) => {
          if (id.toHexString() == '6469a1f65dfe850a92a0b303') {
            return Object.assign({}, mockRoles[0], data);
          }
          throw new NotFoundException();
        },
      ),
  };
  beforeEach(async () => {
    const app = await Test.createTestingModule({
      controllers: [RoleController],
      providers: [
        {
          provide: RoleService,
          useValue: mockRoleService,
        },
      ],
    }).compile();

    roleController = app.get<RoleController>(RoleController);
    roleService = app.get<RoleService>(RoleService);
  });

  it('should defined', () => {
    expect(roleController).toBeDefined();
  });
  describe('Get All Roles', () => {
    it('should get all roles', () => {
      const result = roleController.getRoles({ limit: 10, skip: 0 });
      expect(roleService.GetAllRoles).toHaveBeenCalledWith({
        limit: 10,
        skip: 0,
      });
      expect(result).resolves.toMatchObject(mockRoles);
    });
  });

  describe('Get Role by id', () => {
    const mockRoleId = new Types.ObjectId('6469a1f65dfe850a92a0b303');
    it('should get role by id', () => {
      const result = roleController.getRoleById(mockRoleId);

      expect(roleService.GetRoleById).toHaveBeenCalledWith(mockRoleId);

      expect(result).resolves.toMatchObject(mockRoles[0]);
    });

    it('should throw NotFoundException if role not found', () => {
      expect(
        roleController.getRoleById(new Types.ObjectId()),
      ).rejects.toThrowError(new NotFoundException());
    });
  });

  describe('Delete role', () => {
    it('should delete role', () => {
      const result = roleController.deleteRole(
        new Types.ObjectId('6469a1f65dfe850a92a0b303'),
      );
      expect(roleService.DeleteRole).toHaveBeenCalledWith(
        new Types.ObjectId('6469a1f65dfe850a92a0b303'),
      );

      expect(result).resolves.toBe(undefined);
    });

    it('should throw NotFoundExeption if role not found', () => {
      const result = roleController.deleteRole(new Types.ObjectId());

      expect(result).rejects.toThrowError(new NotFoundException());
    });
  });

  describe('Update role', () => {
    const roleUpdateDto: RoleUpdateDto = {
      description: 'test',
      perms: [5, 6, 7, 8],
    };
    const mockRoleId = new Types.ObjectId('6469a1f65dfe850a92a0b303');
    it('should call RoleService.UpdateRole', () => {
      roleController.updateRole(mockRoleId, roleUpdateDto);

      expect(roleService.UpdateRole).toHaveBeenCalledWith(
        mockRoleId,
        roleUpdateDto,
      );
    });
    it('should update role', () => {
      const result = roleController.updateRole(mockRoleId, roleUpdateDto);

      expect(result).resolves.toMatchObject({
        _id: new Types.ObjectId('6469a1f65dfe850a92a0b303'),
        name: 'administrator',
        description: 'test',
        perms: [5, 6, 7, 8],
      });
    });

    it('should throw NotFoundExeption if role not found', () => {
      const result = roleController.updateRole(
        new Types.ObjectId(),
        roleUpdateDto,
      );

      expect(result).rejects.toThrowError(new NotFoundException());
    });
  });
});
