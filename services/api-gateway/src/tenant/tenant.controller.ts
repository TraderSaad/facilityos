import { Controller, Get, Param, Post, Body, UseGuards, Request } from '@nestjs/common';
import { TenantProxyService } from './tenant-proxy.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tenants')
export class TenantController {
  constructor(private readonly tenantProxy: TenantProxyService) {}

  @Post()
  create(@Body() body: any) {
    return this.tenantProxy.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req: any) {
    return this.tenantProxy.findAll(req.headers.authorization);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: any) {
    return this.tenantProxy.findOne(id, req.headers.authorization);
  }
}
