import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { TenantModule } from './tenant/tenant.module';
import { TenantContextMiddleware } from './tenant/tenant-context.middleware';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), HttpModule, AuthModule, TenantModule],
  controllers: [AuthController]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TenantContextMiddleware)
      .forRoutes({ path: 'tenants', method: RequestMethod.ALL });
  }
}
