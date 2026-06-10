import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatus() {
    return { service: 'tenant-service', status: 'ok' };
  }
}
