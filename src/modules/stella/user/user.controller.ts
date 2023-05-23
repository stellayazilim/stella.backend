import { Controller } from '@nestjs/common';

@Controller({ host: 'administrator.localhost', path: 'users' })
export class UserController {}
