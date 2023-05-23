import { Test } from '@nestjs/testing';
import { RoleService } from '../role.service';
import { getModelToken } from '@nestjs/mongoose';
import { Role } from 'src/schemas/stella/role.schema';

describe('Role service', () => {
  let mockRoleModel;
  let roleService: RoleService;
  beforeEach(async () => {
    mockRoleModel = {
      create: jest.fn(),
      find: jest.fn(),
      findById: jest.fn(),
      findOneAndUpdate: jest.fn(),
      findByIdAndUpdate: jest.fn(),
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
    expect(roleService).toBeUndefined();
  });
});
