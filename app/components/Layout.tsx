'use client';

import Sidebar from './Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ padding: 24, flex: 1 }}>
        {children}
      </main>
    </div>
  );
}
