import { Test } from '@nestjs/testing';
import { UserService } from '../user.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../../../schemas/user.schema';
import { MockUserModel } from './__mocks__/user.model';
import { UserAddDto } from '../dto/user.add.dto';
import { Types } from 'mongoose';
import { ConflictException, NotFoundException } from '@nestjs/common';

import { Role } from 'src/schemas/stella/role.schema';
import { UserUpdateDto } from '../dto/user.create.dto';
describe('User Service', () => {
  const mockUserModel = MockUserModel;

  let userService: UserService;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    userService = app.get<UserService>(UserService);
  });

  describe('Add user', () => {
    const userDto: UserAddDto = {
      firstName: 'Ibrahim',
      lastName: 'SERVETLIGILLER',
      role: new Types.ObjectId().toHexString(),
      email: 'i.servetligiller@stellasoft.tech',
      phone: '+905555555555', //
    };

    it('should defined', () => {
      expect(userService).toBeDefined();
    });

    it('should add new user', () => {
      mockUserModel.create.mockResolvedValue({
        _id: new Types.ObjectId(),
        ...userDto,
      });
      const result = userService.AddUser(userDto);

      expect(mockUserModel.create).toHaveBeenCalledWith(userDto);
      expect(result).resolves.toHaveProperty('_id');
      expect(result).resolves.toMatchObject(userDto);
    });

    it('should throw ConflictException() on duplicate keys', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const mockError = { code: 11000 };
      mockUserModel.create.mockRejectedValue(mockError);

      expect(userService.AddUser(userDto)).rejects.toThrowError(
        new ConflictException(),
      );
    });
  });

  describe('Get users', () => {
    const mockUsers = [
      {
        _id: new Types.ObjectId(),
        firstName: 'Jhon',
        lastName: 'Doe',
        email: 'j@doe.com',
        role: new Role(),
      },
      {
        _id: new Types.ObjectId(),
        firstName: 'Jhon1',
        lastName: 'Doe1',
        email: 'j1@doe.com',
        role: new Role(),
      },
    ];
    it('Should get all users', async () => {
      const mockQuery = {
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue(mockUsers),
      };
      mockUserModel.find.mockReturnValue(mockQuery);

      const result = userService.GetUsers({ skip: 0, limit: 10 });

      expect(mockUserModel.find).toBeCalled();
      expect(mockQuery.limit).toBeCalledWith(10);
      expect(mockQuery.skip).toBeCalledWith(0);
      expect(mockQuery.lean).toHaveBeenCalled();
      expect(result).resolves.toMatchObject(mockUsers);
    });
  });

  describe('Get User By Id', () => {
    const mockUserId = new Types.ObjectId();
    const mockUser = {
      _id: mockUserId,
      firstName: 'Jhon1',
      lastName: 'Doe1',
      email: 'j1@doe.com',
      role: new Role(),
    };
    it('should return user', async () => {
      mockUserModel.findById.mockReturnValue({
        lean: jest.fn().mockResolvedValue({ ...mockUser }),
      });

      const result = userService.GetUserById(mockUserId);
      expect(mockUserModel.findById).toHaveBeenCalledWith(mockUserId);
      expect(result).resolves.not.toThrowError();
      expect(result).resolves.toMatchObject(mockUser);
    });
    it('should throw NotFoundException() if record not found', () => {
      mockUserModel.findById.mockReturnValue({
        lean: jest.fn().mockRejectedValue(new NotFoundException()),
      });
      const result = userService.GetUserById(mockUserId);
      expect(mockUserModel.findById).toBeCalledWith(mockUserId);
      expect(result).rejects.toThrowError(new NotFoundException());
    });
  });

  describe('Update user', () => {
    afterEach(() => jest.clearAllMocks());
    const mockUserUpdateDto: UserUpdateDto = {
      firstName: 'jane',
    };
    const mockUserId: Types.ObjectId = new Types.ObjectId();
    const mockUpdatedUser = Object.assign(
      {},
      {
        firstName: 'Jhon1',
        lastName: 'Doe1',
        email: 'j1@doe.com',
        role: new Role(),
      },
      { _id: mockUserId },
    );
    it('should update user', () => {
      mockUserModel.findByIdAndUpdate.mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockUpdatedUser),
      });

      const result = userService.UpdateUser(mockUserId, mockUserUpdateDto);

      expect(mockUserModel.findByIdAndUpdate).toHaveBeenCalledWith(
        mockUserId,
        mockUserUpdateDto,
        { new: true },
      );

      expect(result).resolves.toMatchObject(mockUpdatedUser);
    });

    it('should throw NotFoundException if document does not exist', () => {
      mockUserModel.findByIdAndUpdate.mockReturnValue({
        lean: jest.fn().mockRejectedValue(new NotFoundException()),
      });
      const result = userService.UpdateUser(mockUserId, mockUserUpdateDto);
      expect(mockUserModel.findByIdAndUpdate).toHaveBeenCalledWith(
        mockUserId,
        mockUserUpdateDto,
        { new: true },
      );

      expect(result).rejects.toThrowError(new NotFoundException());
    });
  });

  describe('Delete user', () => {
    const mockUserId = new Types.ObjectId();

    it('should delete user', () => {
      mockUserModel.findByIdAndRemove.mockResolvedValue({ _id: mockUserId });
      const result = userService.DeleteUser(mockUserId);
      expect(result).resolves.toBe(undefined);
    });

    it('should throw NotFoundException if document does not exist', () => {
      mockUserModel.findByIdAndRemove.mockResolvedValue(null);
      const result = userService.DeleteUser(mockUserId);
      expect(result).rejects.toThrowError(new NotFoundException());
    });
  });
});
