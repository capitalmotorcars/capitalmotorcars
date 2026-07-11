import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { JsonLd, createBreadcrumbItemsFromPath, createBreadcrumbSchema, BreadcrumbItem } from '@/components/JsonLd';



interface LayoutProps {
  children: ReactNode;
  breadcrumbItems?: BreadcrumbItem[];
}

export function Layout({ children, breadcrumbItems }: LayoutProps) {
  const location = useLocation();
  const resolvedBreadcrumbs = breadcrumbItems || createBreadcrumbItemsFromPath(location.pathname);

  return (
    <div className="min-h-screen flex flex-col overflow-x-clip">
      <JsonLd data={createBreadcrumbSchema(resolvedBreadcrumbs)} />
      <Header />
      <main className="flex-1 bg-white dark:bg-white/[0.02] ">
        {children}
      </main>
      <Footer />


    </div>
  );
}
