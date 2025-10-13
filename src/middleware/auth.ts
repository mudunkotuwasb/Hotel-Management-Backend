import { NextFunction, Request, Response } from 'express';
import { createRemoteJWKSet, jwtVerify, JWTPayload } from 'jose';

const issuer = process.env.KEYCLOAK_ISSUER as string | undefined;
const jwksUri = process.env.KEYCLOAK_JWKS_URI as string | undefined;
const audience = process.env.KEYCLOAK_AUDIENCE as string | undefined;

if (!issuer || !jwksUri || !audience) {
  // Do not throw at import time in tests; runtime will check
}

const JWK_SET = jwksUri ? createRemoteJWKSet(new URL(jwksUri)) : undefined;

export interface AuthUser {
  sub: string;
  email?: string;
  name?: string;
  roles: string[];
}

export function authenticate() {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const auth = req.headers.authorization || '';
      const token = auth.startsWith('Bearer ') ? auth.slice('Bearer '.length) : undefined;
      if (!token) {
        return res.status(401).json({ error: 'Missing bearer token' });
      }
      if (!JWK_SET || !issuer || !audience) {
        return res.status(500).json({ error: 'Auth not configured' });
      }
      const { payload } = await jwtVerify(token, JWK_SET, {
        issuer,
        audience,
      });
      const roles = extractRoles(payload);
      (req as any).user = {
        sub: payload.sub as string,
        email: (payload as any).email,
        name: (payload as any).name,
        roles,
      } as AuthUser;
      next();
    } catch (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
}

export function requireRoles(...allowed: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user: AuthUser | undefined = (req as any).user;
    if (!user) return res.status(401).json({ error: 'Unauthenticated' });
    if (!allowed.length) return next();
    const has = user.roles.some((r) => allowed.includes(r));
    if (!has) return res.status(403).json({ error: 'Forbidden' });
    return next();
  };
}

function extractRoles(payload: JWTPayload): string[] {
  // Keycloak exposes roles in realm_access.roles or resource_access[client].roles
  const realmRoles = (payload as any)?.realm_access?.roles as string[] | undefined;
  const clientRoles = (payload as any)?.resource_access?.[audience!]?.roles as string[] | undefined;
  const roles = new Set<string>();
  (realmRoles || []).forEach((r) => roles.add(r));
  (clientRoles || []).forEach((r) => roles.add(r));
  return Array.from(roles);
}






