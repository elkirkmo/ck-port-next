import { describe, expect, it } from '@jest/globals';
import { render, screen, within } from '@testing-library/react';
import {
  awards,
  earlierExperience,
  education,
  experience,
  highlights,
  profile,
  projects,
  skills,
} from '../data/development';
import { siteUrl } from '../siteConfig';
import { personJsonLd, serializeJsonLd } from './jsonLd';
import DevelopmentPage from './page';

describe('/development page', () => {
  it('has one h1 and the main landmarks', () => {
    render(<DevelopmentPage />);

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(profile.name);
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    for (const name of ['Highlights', 'Live projects', 'Experience', 'Skills', 'Get in touch']) {
      expect(screen.getByRole('region', { name })).toBeInTheDocument();
    }
  });

  it('renders every highlight from the data file', () => {
    render(<DevelopmentPage />);
    const region = screen.getByRole('region', { name: 'Highlights' });

    expect(within(region).getAllByRole('listitem')).toHaveLength(highlights.length);
    for (const { value } of highlights) {
      expect(within(region).getByText(value)).toBeInTheDocument();
    }
  });

  it('renders a card per project, linking to each live site by name', () => {
    render(<DevelopmentPage />);
    const region = screen.getByRole('region', { name: 'Live projects' });

    expect(within(region).getAllByRole('article')).toHaveLength(projects.length);
    for (const { name, url, tags, image } of projects) {
      expect(within(region).getByRole('heading', { level: 3, name })).toBeInTheDocument();
      if (image) {
        expect(within(region).getByRole('img', { name: image.alt })).toBeInTheDocument();
      }
      const stack = within(region).getByRole('list', { name: `${name} tech stack` });
      expect(within(stack).getAllByRole('listitem')).toHaveLength(tags.length);
      if (url) {
        const link = within(region).getByRole('link', { name: new RegExp(`^Visit ${name}`) });
        expect(link).toHaveAttribute('href', url);
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      }
    }
  });

  it('renders every role with its bullets, plus earlier roles', () => {
    render(<DevelopmentPage />);
    const region = screen.getByRole('region', { name: 'Experience' });

    for (const { title, company, bullets } of experience) {
      expect(
        within(region).getAllByRole('heading', { level: 3, name: `${title}, ${company}` }).length
      ).toBeGreaterThan(0);
      for (const bullet of bullets) {
        expect(within(region).getByText(bullet)).toBeInTheDocument();
      }
    }
    for (const { company } of earlierExperience) {
      expect(region).toHaveTextContent(company);
    }
  });

  it('renders every skill group', () => {
    render(<DevelopmentPage />);
    const region = screen.getByRole('region', { name: 'Skills' });

    for (const { label, items } of skills) {
      const list = within(region).getByRole('list', { name: `${label} skills` });
      expect(within(list).getAllByRole('listitem')).toHaveLength(items.length);
    }
  });

  it('links the resume button to LinkedIn', () => {
    render(<DevelopmentPage />);

    expect(
      screen.getByRole('link', { name: /^View my resume on LinkedIn/ })
    ).toHaveAttribute('href', profile.linkedin);
  });

  it('offers email, LinkedIn and GitHub in the contact section', () => {
    render(<DevelopmentPage />);
    const region = screen.getByRole('region', { name: 'Get in touch' });

    expect(within(region).getByText(profile.availability)).toBeInTheDocument();
    expect(within(region).getByRole('button', { name: 'Email me' })).toBeInTheDocument();
    expect(
      within(region).getByRole('link', { name: /on LinkedIn/ })
    ).toHaveAttribute('href', profile.linkedin);
    expect(
      within(region).getByRole('link', { name: /on GitHub/ })
    ).toHaveAttribute('href', profile.github);
  });

  it('lists education and awards in the footer', () => {
    render(<DevelopmentPage />);
    const footer = screen.getByRole('contentinfo');

    for (const { title } of [...education, ...awards]) {
      expect(footer).toHaveTextContent(title);
    }
  });

});

describe('Person JSON-LD', () => {
  it('describes the person with sameAs links and no email', () => {
    const data = personJsonLd(profile);

    expect(data).toEqual({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Chris Kirkham',
      jobTitle: 'Senior Software Engineer',
      url: siteUrl,
      sameAs: [profile.linkedin, profile.github],
    });
  });

  it('escapes < so data cannot close the script tag', () => {
    expect(serializeJsonLd({ name: '</script>' })).not.toContain('<');
  });
});
