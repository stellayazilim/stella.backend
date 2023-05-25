import { AdministratorPerms, TenantPerms } from '../perms';

describe('Administrator Perms', () => {
  it('should have typeof enum', () => {
    for (const [key, value] of Object.entries(AdministratorPerms)) {
      if (typeof key == 'number') {
        expect(AdministratorPerms[value]).toBe(Number(key));
      } else break;
    }
  });
});

describe('Tenant Perms', () => {
  it('should have DeleteRole value 1', () => {
    for (const [key, value] of Object.entries(TenantPerms)) {
      if (typeof key == 'number') {
        expect(TenantPerms[value]).toBe(Number(key));
      } else break;
    }
  });
});
