import './globals.css';
import { AuthProvider } from './providers';

export const metadata = {
  title: 'FacilityOS',
  description: 'FacilityOS tenant and auth management platform'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
