import type { ReactNode } from 'react';

type ExternalLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

/** Opens in a new tab and says so to screen readers. */
const ExternalLink = ({ href, className, children }: ExternalLinkProps) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
    {children}
    <span className="sr-only"> (opens in a new tab)</span>
  </a>
);

export default ExternalLink;
