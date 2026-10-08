/**
 * Everything on /development renders from this file. To update the resume,
 * edit the data here — the components only handle layout.
 *
 * The email address is deliberately NOT here. It lives in pieces inside
 * app/components/ObfuscatedEmail.tsx so it never appears in page source.
 */

export type ExternalLink = {
  label: string;
  href: string;
};

export type Profile = {
  name: string;
  title: string;
  location: string;
  /** Shown in the contact section. */
  availability: string;
  intro: string[];
  linkedin: string;
  github: string;
};

export type Project = {
  name: string;
  /** Omit for the site you're currently on. */
  url?: string;
  summary: string;
  role: string;
  details: string[];
  tags: string[];
  /** Real screenshots only. Without one, the card shows a styled placeholder. */
  image?: { src: string; alt: string };
};

export type Role = {
  title: string;
  company: string;
  location?: string;
  dates: string;
  /** Extra context shown under the dates, e.g. a change in employment type. */
  note?: string;
  /** Lead with impact: these render first and most prominently. */
  bullets: string[];
};

export type EarlierRole = {
  title: string;
  company: string;
  dates: string;
  detail?: string;
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export type Highlight = {
  value: string;
  label: string;
};

export type Credential = {
  title: string;
  detail: string;
  year: string;
};

export const profile: Profile = {
  name: 'Chris Kirkham',
  title: 'Senior Software Engineer',
  location: 'Salt Lake City, UT',
  availability:
    "I'm open to senior and lead engineering roles: remote, hybrid, or on-site anywhere from Layton to Lehi, Utah.",
  intro: [
    "I'm a software engineer with 12 years of full-stack and front-end experience in TypeScript, React, Next.js and Python, with Go on the backend. I've built consumer applications at scale for Fandango, Bluehost and Shift, where I was promoted from Senior Software Engineer to Engineering Manager over a team of eight.",
    "Today I'm building AI-agent systems and full-stack products, with a focus on code that stays readable and maintainable, even when an AI wrote it.",
  ],
  linkedin: 'https://www.linkedin.com/in/rchriskirkham',
  github: 'https://github.com/elkirkmo',
};

export const highlights: Highlight[] = [
  { value: '12 years', label: 'building production software' },
  { value: 'Team of 8', label: 'managed as Engineering Manager at Shift' },
  { value: '1000x', label: 'faster Python services than the legacy Perl at Bluehost' },
  { value: '30+', label: 'engineers trained in JavaScript and React' },
];

export const projects: Project[] = [
  {
    name: 'TrulyFreePress.org',
    url: 'https://trulyfreepress.org',
    summary:
      'A news platform that pulls coverage of the same story from multiple sources, then uses AI agents to find the most accurate information in each and synthesize a single article.',
    role: 'Co-developer. My focus is code review and guardrails: keeping agent output correct, on-brief and maintainable.',
    details: [
      'We built the agent framework. Agents run on Claude Opus through the Anthropic API, alongside self-hosted LLMs.',
      'Monorepo with a Python backend and two TypeScript frontends.',
      'Stack chosen on purpose: popular, well-documented technologies, so LLM-written code stays readable and a person can take over if the agents or a developer drop out.',
    ],
    tags: ['Python', 'TypeScript', 'Claude API', 'Self-hosted LLMs', 'AI agents', 'Monorepo'],
  },
  {
    name: '31for31',
    url: 'https://31for31.vercel.app',
    summary:
      'A Halloween-season site with 31 horror, spooky and Halloween films to watch every October, with sets for 2024 and 2025 and 2026 coming.',
    role: 'Solo developer, built with Claude Code.',
    details: [
      'Svelte frontend, Python/Flask REST API and a Supabase database, plus a service that pulls streaming availability for each film.',
    ],
    tags: ['Svelte', 'Python', 'Flask', 'Supabase', 'REST API', 'Vercel'],
  },
  {
    name: 'chriskirkham.com',
    summary: 'This site.',
    role: 'Solo developer.',
    details: ['Google Calendar API powers the live event listings.'],
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'Jest/RTL', 'Vercel'],
  },
];

export const experience: Role[] = [
  {
    title: 'Independent / Freelance Developer',
    company: 'chriskirkham.com',
    location: 'Salt Lake City',
    dates: 'Jan 2026 – Present',
    bullets: [
      'Building TrulyFreePress.org, 31for31 and chriskirkham.com (see Live projects).',
    ],
  },
  {
    title: 'Engineering Manager',
    company: 'Shift',
    location: 'Remote',
    dates: 'Sept 2022 – Jan 2023',
    bullets: [
      'Promoted from Senior Software Engineer to manage a team of 8 engineers and a $1M budget, overseeing scheduling, planning and delivery for React e-commerce client applications.',
      'Tracked expenses, capital expenditure and paid contracts; consulted on software and technology adoption.',
      'Coached and mentored direct reports to help them grow in their careers.',
    ],
  },
  {
    title: 'Senior Software Engineer',
    company: 'Shift',
    location: 'Remote',
    dates: 'July 2021 – Sept 2022',
    bullets: [
      'Led a team of four developers building marketplace solutions and marketing technology for used-car sales.',
      "Maintained and improved the company's core Go application, and built a server-side rendered front-end client on its API to cut page load times.",
      'Rebuilt the main consumer application from a legacy monolith into a modern Rails 7 application, and helped improve and maintain the AWS SQS/SNS event pipeline.',
      'Owned front-end standards across client applications; worked with GraphQL.',
    ],
  },
  {
    title: 'Senior Software Engineer',
    company: 'Bluehost',
    location: 'Salt Lake City',
    dates: 'Nov 2018 – June 2021',
    bullets: [
      'Built containerized Flask microservices in Python that ran up to 1000x faster than the legacy Perl implementation, helping break apart a legacy monolith. The team deployed these microservices on Kubernetes.',
      'Co-led JavaScript/React lunch-and-learns, training 30+ engineers moving off Perl.',
      'Full-stack: client features, REST API endpoints, Business Intelligence rules, server-side logic; worked with GraphQL.',
    ],
  },
  {
    title: 'Senior Front-End Developer',
    company: 'Clearlink',
    location: 'Salt Lake City',
    dates: 'Aug 2017 – Oct 2018',
    bullets: [
      "Introduced CircleCI-integrated deployment and led the Bedrock migration for 5 of the team's 12+ WordPress sites, then scaled CircleCI across 30+ sites.",
      'Used Redis to speed up WordPress and PHP applications.',
      'Trained junior developers and built CLI tools for the wider dev team.',
    ],
  },
  {
    title: 'Front-End Developer',
    company: 'Fandango',
    location: 'Los Angeles',
    dates: 'Jan 2015 – Aug 2017',
    note: 'Full-time in Los Angeles through Dec 2016, then the same work as a remote contractor through Yoh, Jan – Aug 2017.',
    bullets: [
      'Improved the purchase flow with new features and bug fixes; ran A/B tests with Adobe Target.',
      'Built Chrome extensions and automation scripts in JavaScript, C# and PowerShell.',
    ],
  },
];

export const earlierExperience: EarlierRole[] = [
  {
    title: 'Front-End Developer',
    company: 'Spark Networks',
    dates: '2013–2015',
    detail: 'Mobile web JDate in jQuery Mobile',
  },
  {
    title: 'WordPress Developer',
    company: 'Analog Creative',
    dates: '2012–2013',
  },
];

export type Sabbatical = {
  before: string;
  /** Rendered in italics; linked when `href` is set. */
  work: string;
  after: string;
  href?: string;
};

// TODO(#23): set href to '/documentary' once that page exists (it 404s today).
export const sabbatical: Sabbatical = {
  before: 'From 2023 to 2025 I took a sabbatical to make ',
  work: 'Diverted',
  after: ', a Student Emmy–winning documentary.',
};

export const skills: SkillGroup[] = [
  {
    label: 'Primary',
    items: ['TypeScript', 'JavaScript', 'React', 'Next.js', 'Svelte', 'Tailwind CSS', 'Node.js'],
  },
  {
    label: 'Backend',
    items: ['Python (Flask)', 'Go', 'Ruby on Rails', 'PHP', 'REST', 'GraphQL'],
  },
  {
    label: 'Data',
    items: ['SQL databases and data architecture design', 'Supabase', 'Redis'],
  },
  {
    label: 'AI',
    items: [
      'Anthropic Claude API',
      'AI agents',
      'Self-hosted LLMs',
      'Retrieval-grounded generation',
      'Claude Code',
    ],
  },
  {
    label: 'Testing',
    items: ['Jest', 'React Testing Library', 'Cypress'],
  },
  {
    label: 'DevOps / Cloud',
    items: ['AWS (SQS/SNS)', 'Docker/containers', 'Kubernetes', 'CircleCI', 'Vercel'],
  },
];

export const education: Credential[] = [
  { title: 'M.A. Interactive Media', detail: 'Elon University', year: '2012' },
  {
    title: 'B.S. Communication (Journalism), minor in Russian',
    detail: 'BYU-Idaho',
    year: '2009',
  },
];

export const awards: Credential[] = [
  {
    title: 'Rocky Mountain Emmy Student Production Award',
    detail: 'Diverted',
    year: 'Oct 2024',
  },
];
