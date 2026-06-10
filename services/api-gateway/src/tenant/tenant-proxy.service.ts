import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TenantProxyService {
  private tenantBase: string;

  constructor(private readonly httpService: HttpService, private readonly config: ConfigService) {
    this.tenantBase = this.config.get<string>('TENANT_SERVICE_URL', 'http://localhost:3002');
  }

  async create(body: any) {
    try {
      const response = await firstValueFrom(this.httpService.post(`${this.tenantBase}/tenants`, body));
      return response.data;
    } catch (error: any) {
      throw new InternalServerErrorException(error?.response?.data || 'Unable to create tenant');
    }
  }

  async findAll(auth: string) {
    try {
      const response = await firstValueFrom(this.httpService.get(`${this.tenantBase}/tenants`, { headers: { Authorization: auth || '' } }));
      return response.data;
    } catch (error: any) {
      throw new InternalServerErrorException(error?.response?.data || 'Unable to list tenants');
    }
  }

  async findOne(id: string, auth: string) {
    try {
      const response = await firstValueFrom(this.httpService.get(`${this.tenantBase}/tenants/${id}`, { headers: { Authorization: auth || '' } }));
      return response.data;
    } catch (error: any) {
      throw new InternalServerErrorException(error?.response?.data || 'Unable to fetch tenant');
    }
  }
}
