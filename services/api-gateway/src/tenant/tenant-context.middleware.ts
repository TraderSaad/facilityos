import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TenantContextMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (authHeader && typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
      const token = authHeader.replace('Bearer ', '');
      try {
        const payload = jwt.decode(token) as any;
        if (payload?.tenantId) {
          req.headers['x-tenant-id'] = payload.tenantId;
        }
      } catch {
        // ignore invalid token for middleware context
      }
    }
    next();
  }
}
