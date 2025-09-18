export type Page = {
  title: string;
  linkText: string;
  pageTitle: string;
  description: string;
};

export type FAQ = {
  question: string;
  answer: string;
};

const content = {
  pages: [
    {
      title: 'development',
      linkText: "Some of the web projects I&apos; been working on lately",
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
      question: 'What is Chris Kula?',
      answer:
        'Chris Kula is a multifaceted creative professional specializing in web development, documentary filmmaking, and live performances. With a passion for storytelling and technology, Chris combines technical expertise with artistic vision to create engaging digital experiences and compelling narratives.',
    },
    {
      question: 'How can I contact Chris Kula?',
      answer:
        'You can reach out to Chris Kula via email at ',
    },
  ] as FAQ[],
};

export default content;