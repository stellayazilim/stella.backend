import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
@Injectable()
export class StellaGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const re = /\.?localhost/;
    const subdomains = request.hostname.replace(re, '').split('.');

    return subdomains[0] != 'tenants' && subdomains[1] == undefined;
  }
}
