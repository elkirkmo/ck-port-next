/**
 * Source of truth for the home page cards and FAQ. The content.json that
 * lambdas/getContent.js serves lives only in S3, is not read by this app,
 * and has drifted from this file (see #27).
 */
export type Page = {
  title: string;
  linkText: string;
  pageTitle: string;
  description: string;
};

export type FAQ = {
  question: string;
  answer: string;
  /** Appends the scraper-protected email (see ObfuscatedEmail) after the answer. */
  showEmail?: boolean;
};

const content = {
  pages: [
    {
      title: 'development',
      linkText: "Projects I'm building and the work behind them",
      pageTitle: '',
      description: '',
    },
    {
      title: 'documentary',
      linkText: 'Examples of my documentary work',
      pageTitle: '',
      description: '',
    },
    {
      title: 'film',
      linkText: 'Examples of my work in film',
      pageTitle: '',
      description: '',
    },
    {
      title: 'live',
      linkText: 'Come see me live! Pub Trivia, Comedy and More',
      pageTitle: 'Live Performances',
      description: 'Come see me perform live! Standup, Trivia and more.',
    },
  ] as Page[],
  FAQ: [
    {
      question: 'What is Chris Kirkham?',
      answer:
        'Chris Kirkham is a multifaceted creative professional specializing in web development, documentary filmmaking, and live performances. With a passion for storytelling and technology, Chris combines technical expertise with artistic vision to create engaging digital experiences and compelling narratives.',
    },
    {
      question: 'How can I contact Chris Kirkham?',
      answer: 'You can reach out to Chris Kirkham by email:',
      showEmail: true,
    },
  ] as FAQ[],
};

export default content;