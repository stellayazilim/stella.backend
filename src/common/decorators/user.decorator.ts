import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { pick } from 'underscore';
export const User = createParamDecorator(
  (data: string | string[] | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return data ? pick(request.user, data) : request.user;
  },
);
