/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  tenantIdStub,
  tenantStub,
  tenantWithIdStub,
} from '../__STUBS__/tenant.stub';
import { TenantCreateDto } from '../dto/tenant.create.dto';
import { TenantUpdateDto } from '../dto/tenant.update.dto';

export const MockTenantModel = {
  constructor: jest.fn().mockImplementation((data: TenantCreateDto) => {
    return jest.fn().mockReturnThis();
  }),

  save: jest.fn().mockReturnThis(),

  find: jest.fn().mockReturnThis(),

  create: jest.fn().mockReturnThis(),
  // mockImplementation(async (data?: TenantCreateDto) => {
  //   return jest.fn().mockReturnValue({ _id: tenantIdStub, ...data });
  // }),

  findOne: jest.fn().mockReturnThis(),
  // .mockImplementation(async (_id: import('mongoose').Types.ObjectId) =>
  //   jest.fn().mockReturnThis(),
  // ),

  findByIdAndUpdate: jest.fn().mockReturnThis(),
  // .mockImplementation(
  //   async (_id: import('mongoose').Types.ObjectId, data: TenantUpdateDto) => {
  //     return jest
  //       .fn()
  //       .mockReturnValue(Object.assign({ _id }, tenantStub(), data));
  //   },
  // ),
};
