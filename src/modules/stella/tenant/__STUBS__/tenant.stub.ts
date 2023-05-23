import { Types } from 'mongoose';

export const tenantStub = () => ({
  company: 'Yourcompany',
  host: 'yourcompany.com',
  isCompany: true,
  phone: '+905555555555',
});

export const tenantIdStub = (): import('mongoose').Types.ObjectId =>
  new Types.ObjectId('6469a1f65dfe850a92a0b303');

export const tenantWithIdStub = () => {
  const _id = tenantIdStub();
  return {
    ...tenantStub(),
    _id,
  };
};
