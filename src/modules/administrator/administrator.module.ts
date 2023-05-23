import { Module } from '@nestjs/common';
import { TenantModule } from './tenant/tenant.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [TenantModule, AuthModule, RoleModule],
})
export class AdministratorModule {}
