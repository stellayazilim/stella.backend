import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const Tenant = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

    const subdomains = req.hosts.subdomain.split(/\./g);

    console.log(subdomains);

    if (subdomains[0] == 'tenant' && subdomains[1])
      return { tenantName: subdomains[1] };
    else return 'using administrator api';
  },
);
