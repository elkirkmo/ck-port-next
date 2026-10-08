import type { ReactNode } from 'react';

type SectionProps = {
  id: string;
  title: string;
  children: ReactNode;
};

/** A landmark region named by its own visible heading. */
const Section = ({ id, title, children }: SectionProps) => (
  <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-8">
    <h2 id={`${id}-heading`} className="mb-6 text-3xl font-bold text-gray-900">
      {title}
    </h2>
    {children}
  </section>
);

export default Section;
