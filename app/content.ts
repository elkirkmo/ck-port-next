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
    // {
    //   title: 'development',
    //   linkText: "Some of the web projects I&apos; been working on lately",
    //   pageTitle: '',
    //   description: '',
    // },
    // {
    //   title: 'documentary',
    //   linkText: 'Examples of my documentary work',
    //   pageTitle: '',
    //   description: '',
    // },
    // {
    //   title: 'film',
    //   linkText: 'Examples of my work in film',
    //   pageTitle: '',
    //   description: '',
    // },
    {
      title: 'live',
      linkText: 'Come see me live! Pub Trivia, Comedy and More',
      pageTitle: 'Live Performances',
      description: 'Come see me perform live! Standup, Trivia and more.',
    },
  ] as Page[],
  FAQ: [
    {
      question: 'Who is Chris Kirkham?',
      answer:
        'Chris Kirkham is a multifaceted creative professional specializing in web development, documentary filmmaking, and live performances. With a passion for storytelling and technology, Chris combines technical expertise with artistic vision to create engaging digital experiences and compelling narratives.',
    },
    {
      question: 'Why isn\'t Chris Kirkham on social Media?',
      answer:
        'You can reach out to Chris Kirkham via email at ',
    },
  ] as FAQ[],
};

export default content;