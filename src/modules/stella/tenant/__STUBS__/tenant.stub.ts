import mongoose, { Types } from 'mongoose';

export const tenantStub = () => ({
  company: 'Yourcompany',
  host: 'yourcompany.com',
  isCompany: true,
  phone: '+905555555555',
});

export const tenantIdStub = (): import('mongoose').Types.ObjectId =>
  '6469a1f65dfe850a92a0b303' as unknown as Types.ObjectId;

export const tenantWithIdStub = () => {
  const _id = tenantIdStub();
  return {
    ...tenantStub(),
    _id: _id,
  };
};
