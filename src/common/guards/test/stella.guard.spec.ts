import type { ExecutionContext } from '@nestjs/common';
import { StellaGuard } from '../stella.guard';

describe('stella guard', () => {
  const mockExecutionContext: Partial<
    Record<
      jest.FunctionPropertyNames<ExecutionContext>,
      jest.MockedFunction<any>
    >
  > = {
    switchToHttp: jest.fn().mockReturnValue({
      getRequest: jest.fn().mockReturnValue({
        hostname: 'tenants.stella.localhost',
      }),
      getResponse: jest.fn(),
    }),
  };

  let stellaGuard: StellaGuard;

  beforeEach(() => {
    stellaGuard = new StellaGuard();
  });
  it('should defined', () => {
    expect(stellaGuard.canActivate).toBeDefined();
  });

  it('should return false if subdomain is not tenants.:tenantname', () => {
    const activated = stellaGuard.canActivate(
      mockExecutionContext as ExecutionContext,
    );

    expect(activated).toBe(false);
  });
});
