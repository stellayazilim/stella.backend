import { UserAddDto } from '../../dto/user.add.dto';

export const MockUserModel = {
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndRemove: jest.fn(),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create: jest.fn(),
};
