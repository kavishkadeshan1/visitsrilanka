import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { generateBreadcrumbSchema } from '@/lib/seo';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const location = useLocation();

  // Generate schema items - add home at the beginning
  const schemaItems = [
    { name: 'Home', url: '/' },
    ...items.map((item) => ({
      name: item.label,
      url: item.href || location.pathname,
    })),
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(schemaItems);

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      {/* JSON-LD for breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <ol className="flex items-center flex-wrap gap-1 text-sm text-gray-600">
        {/* Home link */}
        <li className="flex items-center">
          <Link
            to="/"
            className="flex items-center hover:text-primary-600 transition-colors"
            aria-label="Home"
          >
            <Home className="w-4 h-4" />
          </Link>
        </li>

        {/* Breadcrumb items */}
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center">
              <ChevronRight className="w-4 h-4 mx-1 text-gray-400" aria-hidden="true" />
              {isLast || !item.href ? (
                <span className="font-medium text-gray-900" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.href}
                  className="hover:text-primary-600 transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
