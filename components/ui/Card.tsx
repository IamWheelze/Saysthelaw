import { cn } from '@/lib/utils/helpers';
import { ReactNode } from 'react';
import Link from 'next/link';

interface CardProps {
  title: string;
  description: string;
  href?: string;
  image?: string;
  tag?: string;
  className?: string;
  children?: ReactNode;
}

export default function Card({
  title,
  description,
  href,
  image,
  tag,
  className,
  children,
}: CardProps) {
  const content = (
    <>
      {image && (
        <div className="h-48 bg-gray-200 rounded-t-lg overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className={cn('p-6', image && 'rounded-t-none')}>
        {tag && (
          <span className="inline-block px-3 py-1 text-xs font-semibold text-primary-600 bg-primary-50 rounded-full mb-2">
            {tag}
          </span>
        )}
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        {children}
      </div>
    </>
  );

  const cardClasses = cn(
    'bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200',
    className
  );

  if (href) {
    return (
      <Link href={href} className={cn(cardClasses, 'block')}>
        {content}
      </Link>
    );
  }

  return <div className={cardClasses}>{content}</div>;
}
