import { Test } from '@nestjs/testing';
import { UserService } from '../user.service';
import { getModelToken } from '@nestjs/mongoose';
import { User, UserModel } from '../../../../schemas/user.schema';
import { MockUserModel } from './__mocks__/user.model';
import { UserAddDto } from '../dto/user.add.dto';
import { Types } from 'mongoose';
import { ConflictException } from '@nestjs/common';
describe('User Service', () => {
  const mockUserModel = MockUserModel;
  let userService: UserService;
  let userModel: UserModel;
  beforeAll(async () => {
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
    userModel = app.get<UserModel>(getModelToken(User.name));
  });

  describe('AddUser', () => {
    const userDto: UserAddDto = {
      firstName: 'Ibrahim',
      lastName: 'SERVETLIGILLER',
      role: new Types.ObjectId().toHexString(),
      email: 'i.servetligiller@stellasoft.tech',
      phone: '+905555555555', //
    };
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it('should defined', () => {
      expect(userService).toBeDefined();
    });

    it('should add new user', () => {
      mockUserModel.create.mockResolvedValue({
        _id: new Types.ObjectId(),
        ...userDto,
      });
      const result = userService.AddUser(userDto);

      expect(userModel.create).toHaveBeenCalledWith(userDto);
      expect(result).resolves.toHaveProperty('_id');
    });

    it('should throw ConflictException() on duplicate keys', async () => {
      jest.clearAllMocks();

      mockUserModel.create.mockImplementation(async (data: UserAddDto) => {
        throw new ConflictException();
      });

      const result = userService.AddUser(userDto);
      expect(result).rejects.toThrow({ ...new ConflictException() });
    });
  });
});
