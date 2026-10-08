/**
 * Source of truth for the home page cards. The content.json that
 * lambdas/getContent.js serves lives only in S3, is not read by this app,
 * and has drifted from this file (see #27).
 */
export type Page = {
  title: string;
  linkText: string;
  pageTitle: string;
  description: string;
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
};

export default content;