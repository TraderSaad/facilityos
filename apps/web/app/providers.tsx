'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import safeParseJson from '../lib/safeParseJson';

export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  tenantId: string;
}

export interface AuthContextValue {
  user: UserProfile | null;
  token: string | null;
  initialized: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (credentials: { email: string; password: string; name?: string; tenantId: string }) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuth = () => useContext(AuthContext);

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? '';
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_AUTH === 'true';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  // Use centralized safe JSON parser to avoid runtime JSON.parse errors
  const safeJsonParse = <T,>(value: string | null | undefined): T | null => {
    return safeParseJson<T>(value ?? null);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const savedToken = localStorage.getItem('facilityos_token');
    const savedUser = safeJsonParse<UserProfile>(localStorage.getItem('facilityos_user'));

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(savedUser);
    }

    setInitialized(true);
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    const effectiveMock = USE_MOCK || !API_BASE;

    // Mock authentication mode (local/demo) — no network required
    if (effectiveMock) {
      const demoEmail = 'demo@facilityos.local';
      const demoPassword = 'Password123';

      if (credentials.email === demoEmail && credentials.password === demoPassword) {
        const mockUser: UserProfile = {
          id: 'demo',
          email: demoEmail,
          name: 'Demo User',
          tenantId: 'demo-tenant'
        };
        const mockToken = 'mock-token-demo';
        setUser(mockUser);
        setToken(mockToken);
        if (typeof window !== 'undefined') {
          localStorage.setItem('facilityos_token', mockToken);
          localStorage.setItem('facilityos_user', JSON.stringify(mockUser));
        }
        return;
      }

      throw new Error('Invalid demo credentials. Use demo@facilityos.local / Password123');
    }

    // Real API mode
    try {
      const response = await fetch(`${API_BASE.replace(/\/$/, '')}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.message || 'Invalid login credentials');
      }

      const data = await response.json();
      setUser(data.user);
      setToken(data.accessToken);
      if (typeof window !== 'undefined') {
        localStorage.setItem('facilityos_token', data.accessToken);
        localStorage.setItem('facilityos_user', JSON.stringify(data.user));
      }
    } catch (err) {
      // If the API call fails but mock mode is allowed, fall back to mock behavior
      if (USE_MOCK) {
        const demoEmail = 'demo@facilityos.local';
        const demoPassword = 'Password123';
        if (credentials.email === demoEmail && credentials.password === demoPassword) {
          const mockUser: UserProfile = {
            id: 'demo',
            email: demoEmail,
            name: 'Demo User',
            tenantId: 'demo-tenant'
          };
          const mockToken = 'mock-token-demo';
          setUser(mockUser);
          setToken(mockToken);
          if (typeof window !== 'undefined') {
            localStorage.setItem('facilityos_token', mockToken);
            localStorage.setItem('facilityos_user', JSON.stringify(mockUser));
          }
          return;
        }
        throw new Error('Invalid demo credentials. Use demo@facilityos.local / Password123');
      }

      throw err;
    }
  };

  const register = async (credentials: { email: string; password: string; name?: string; tenantId: string }) => {
    const effectiveMock = USE_MOCK || !API_BASE;

    if (effectiveMock) {
      // Simple mock register: accept any non-empty credentials and generate a tenant
      const mockUser: UserProfile = {
        id: `mock-${Date.now()}`,
        email: credentials.email,
        name: credentials.name || 'New User',
        tenantId: credentials.tenantId || `tenant-${Math.random().toString(36).slice(2, 8)}`
      };
      const mockToken = `mock-token-${Date.now()}`;
      setUser(mockUser);
      setToken(mockToken);
      if (typeof window !== 'undefined') {
        localStorage.setItem('facilityos_token', mockToken);
        localStorage.setItem('facilityos_user', JSON.stringify(mockUser));
      }
      return;
    }

    const response = await fetch(`${API_BASE.replace(/\/$/, '')}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      throw new Error(body?.message || 'Unable to create account');
    }

    const data = await response.json();
    setUser(data.user);
    setToken(data.accessToken);
    if (typeof window !== 'undefined') {
      localStorage.setItem('facilityos_token', data.accessToken);
      localStorage.setItem('facilityos_user', JSON.stringify(data.user));
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('facilityos_token');
    localStorage.removeItem('facilityos_user');
  };

  const value = useMemo(
    () => ({ user, token, initialized, login, register, logout }),
    [user, token, initialized]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
