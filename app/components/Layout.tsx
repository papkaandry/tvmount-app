'use client';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main style={{ padding: 24 }}>
      {children}
    </main>
  );
}
