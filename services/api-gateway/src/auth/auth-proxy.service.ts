import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthProxyService {
  private identityBase: string;

  constructor(private readonly httpService: HttpService, private readonly config: ConfigService) {
    this.identityBase = this.config.get<string>('IDENTITY_SERVICE_URL', 'http://localhost:3001');
  }

  async register(body: any) {
    try {
      const response = await firstValueFrom(this.httpService.post(`${this.identityBase}/auth/register`, body));
      return (response as any).data;
    } catch (error: any) {
      throw new InternalServerErrorException(error?.response?.data || 'Unable to register');
    }
  }

  async login(body: any) {
    try {
      const response = await firstValueFrom(this.httpService.post(`${this.identityBase}/auth/login`, body));
      return (response as any).data;
    } catch (error: any) {
      throw new InternalServerErrorException(error?.response?.data || 'Unable to login');
    }
  }
}
