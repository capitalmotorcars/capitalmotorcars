import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

export function ServiceCard({ title, description, href, icon: Icon }: ServiceCardProps) {
  return (
    <Link
      to={href}
      className="group block bg-card border border-border rounded-lg p-6 card-hover"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-primary mb-2 group-hover:text-accent transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
          <div className="mt-4 flex items-center gap-1 text-accent text-sm font-medium">
            Learn more
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}
