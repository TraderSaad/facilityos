import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TenantController } from './tenant.controller';
import { TenantProxyService } from './tenant-proxy.service';

@Module({
  imports: [HttpModule],
  controllers: [TenantController],
  providers: [TenantProxyService]
})
export class TenantModule {}
