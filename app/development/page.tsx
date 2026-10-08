import type { Metadata } from 'next';
import Link from 'next/link';
import {
  awards,
  earlierExperience,
  education,
  experience,
  highlights,
  profile,
  projects,
  sabbatical,
  skills,
} from '../data/development';
import ContactCTA from './components/ContactCTA';
import ExternalLink from './components/ExternalLink';
import EducationAwards from './components/EducationAwards';
import ExperienceTimeline from './components/ExperienceTimeline';
import Highlights from './components/Highlights';
import ProjectCard from './components/ProjectCard';
import Section from './components/Section';
import SkillGroups from './components/SkillGroups';
import { primaryButton, secondaryButton } from './components/buttonStyles';
import { personJsonLd, serializeJsonLd } from './jsonLd';

const title = `${profile.name}, ${profile.title}`;
const description =
  'Senior full-stack engineer in Salt Lake City: 12 years of TypeScript and React, Python and Go on the backend, now building with AI agents.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/development' },
  openGraph: {
    title,
    description,
    url: '/development',
    type: 'profile',
  },
};

export default function DevelopmentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(personJsonLd(profile)) }}
      />
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm">
          <Link href="/" className="text-gray-800 underline underline-offset-2">
            Home
          </Link>
        </nav>
        <main className="space-y-16">
          <header className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-6xl">
              {profile.name}
            </h1>
            <p className="text-xl font-semibold text-gray-900 sm:text-2xl">
              {profile.title} · {profile.location}
            </p>
            {profile.intro.map((paragraph) => (
              <p key={paragraph} className="max-w-prose text-lg text-gray-800">
                {paragraph}
              </p>
            ))}
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <a href="#contact" className={primaryButton}>
                Get in touch
              </a>
              <ExternalLink href={profile.linkedin} className={secondaryButton}>
                View my resume on LinkedIn
              </ExternalLink>
            </div>
          </header>

          <Highlights items={highlights} />

          <Section id="projects" title="Live projects">
            <div className="grid gap-6 md:grid-cols-2">
              {projects.map((project) => (
                <ProjectCard key={project.name} project={project} />
              ))}
            </div>
          </Section>

          <Section id="experience" title="Experience">
            <ExperienceTimeline
              roles={experience}
              earlier={earlierExperience}
              sabbatical={sabbatical}
            />
          </Section>

          <Section id="skills" title="Skills">
            <SkillGroups groups={skills} />
          </Section>

          <Section id="contact" title="Get in touch">
            <ContactCTA profile={profile} />
          </Section>
        </main>
        <footer className="mt-16 border-t border-gray-300 pt-8">
          <EducationAwards education={education} awards={awards} />
        </footer>
      </div>
    </>
  );
}
