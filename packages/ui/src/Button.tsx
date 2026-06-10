import type { PropsWithChildren } from 'react';

export function Button({ children }: PropsWithChildren) {
  return (
    <button style={{ padding: '0.75rem 1.25rem', borderRadius: '0.5rem', background: '#2563eb', color: '#fff' }}>
      {children}
    </button>
  );
}
