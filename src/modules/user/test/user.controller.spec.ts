import { Test } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { Types } from 'mongoose';
import { MockUserService } from './__mocks__/user.service';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { Role } from 'src/schemas/stella/role.schema';
import { UserUpdateDto } from '../dto/user.create.dto';

describe('User Controller', () => {
  let userController: UserController;
  const mockUserService = MockUserService;
  beforeEach(async () => {
    const app = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    userController = app.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('Add User', () => {
    afterEach(() => {
      jest.resetAllMocks();
      jest.clearAllMocks();
    });
    const mockAddUserDto = {
      firstName: 'Ibrahim',
      lastName: 'SERVETLIGILLER',
      role: new Types.ObjectId().toHexString(),
      email: 'i.servetligiller@stellasoft.tech',
      phone: '+905555555555', //
    };

    it('should add user', () => {
      mockUserService.AddUser.mockResolvedValue(
        Object.assign({}, { _id: new Types.ObjectId() }, mockAddUserDto),
      );
      const result = userController.addUser(mockAddUserDto);

      expect(mockUserService.AddUser).toHaveBeenCalledWith(mockAddUserDto);
      expect(result).resolves.toHaveProperty('_id');
      expect(result).resolves.toMatchObject(mockAddUserDto);
    });

    it('should throw ConflictException on duplicate keys', () => {
      mockUserService.AddUser.mockRejectedValue(new ConflictException());
      const result = userController.addUser(mockAddUserDto);
      expect(result).rejects.toThrowError(new ConflictException());
    });
  });

  describe('Get Users', () => {
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
    it('should get users', () => {
      mockUserService.GetUsers.mockResolvedValue(mockUsers);

      const result = userController.getUsers({ limit: 10, skip: 0 });

      expect(mockUserService.GetUsers).toBeCalledWith({ limit: 10, skip: 0 });
      expect(result).resolves.toMatchObject(mockUsers);
    });
  });

  describe('Get user by id', () => {
    const mockUserId = new Types.ObjectId();
    const mockUser = {
      _id: mockUserId,
      firstName: 'Jhon1',
      lastName: 'Doe1',
      email: 'j1@doe.com',
      role: new Role(),
    };

    it('should get user by id', () => {
      mockUserService.GetUserById.mockResolvedValue(mockUser);

      const result = userController.getUserById(mockUserId);

      expect(mockUserService.GetUserById).toBeCalledWith(mockUserId);
      expect(result).resolves.toMatchObject(mockUser);
    });

    it('should throw NotFoundException if user not found by id', () => {
      mockUserService.GetUserById.mockRejectedValue(new NotFoundException());
      const result = userController.getUserById(mockUserId);
      expect(mockUserService.GetUserById).toBeCalledWith(mockUserId);
      expect(result).rejects.toThrowError(new NotFoundException());
    });
  });

  describe('Update user', () => {
    const mockUserId = new Types.ObjectId();
    const mockUser = {
      _id: mockUserId,
      firstName: 'Jhon1',
      lastName: 'Doe1',
      email: 'j1@doe.com',
      role: new Role(),
    };

    const userUpdateDto: UserUpdateDto = {
      firstName: 'jane',
    };

    it('should update user by id', () => {
      mockUserService.UpdateUser.mockResolvedValue(
        Object.assign(mockUser, userUpdateDto),
      );

      const result = userController.updateUser(mockUserId, userUpdateDto);
      expect(mockUserService.UpdateUser).toBeCalledWith(
        mockUserId,
        userUpdateDto,
      );

      expect(result).resolves.toMatchObject({ ...mockUser, ...userUpdateDto });
    });

    it('should throw NotFoundException if user not found', () => {
      mockUserService.UpdateUser.mockRejectedValue(new NotFoundException());

      const result = userController.updateUser(mockUserId, userUpdateDto);

      expect(result).rejects.toThrowError(new NotFoundException());
    });
  });

  describe('Delete user', () => {
    const mockUserId = new Types.ObjectId();
    it('should delete user', () => {
      const result = userController.deleteUser(mockUserId);

      expect(result).resolves.toBe(undefined);
    });

    it('should throw NotFoundException if user not found', () => {
      mockUserService.DeleteUser.mockRejectedValue(new NotFoundException());

      const result = userController.deleteUser(mockUserId);
      expect(result).rejects.toThrowError(new NotFoundException());
    });
  });
});
