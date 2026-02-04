import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-muted overflow-x-hidden dark:bg-[hsl(0_0%_4%)] dark:dark-bg-grain">
      <Header />
      <main className="flex-1 pt-14 md:pt-12">
        {children}
      </main>
      <Footer />
    </div>
  );
}
