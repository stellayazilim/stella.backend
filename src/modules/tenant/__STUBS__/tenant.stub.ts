export const tenantStub = () => ({
  name: 'Yourcompany',
  host: 'yourcompany.com',
  isCompany: true,
  contact: {
    phoneNumber: ['+905555555555'],
  },
});

export const tenantIdStub = (): string => '6469a1f65dfe850a92a0b303';

export const tenantWithIdStub = () => {
  const id = tenantIdStub();
  return {
    ...tenantStub(),
    id,
  };
};
