import { Controller, Get, HostParam } from '@nestjs/common';
import { AppService } from './app.service';

@Controller({ host: ':tenant.localhost' })
export class AppController {
  constructor(private readonly appService: AppService) {}
}
