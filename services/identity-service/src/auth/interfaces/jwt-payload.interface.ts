export interface JwtPayload {
  sub: string;
  email: string;
  tenantId: string;
  name: string | null;
  iat?: number;
  exp?: number;
}
