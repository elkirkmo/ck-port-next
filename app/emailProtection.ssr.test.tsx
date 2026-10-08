/**
 * @jest-environment node
 */
import { describe, expect, it } from '@jest/globals';
import { renderToString } from 'react-dom/server';
import ObfuscatedEmail from './components/ObfuscatedEmail';
import content from './content';
import contentJson from './content.json';
import DevelopmentPage from './development/page';
import Home from './page';

// Server rendering is what scrapers see as page source.
const ADDRESS = 'me@chriskirkham.com';

describe('email address stays out of page source', () => {
  it('ObfuscatedEmail server-renders only the split no-JS fallback', () => {
    const html = renderToString(<ObfuscatedEmail />);

    expect(html).not.toContain(ADDRESS);
    expect(html).not.toContain('mailto:');
    expect(html).not.toContain('<button');
    expect(html).toMatch(/me.*\[at\].*chriskirkham.*\[dot\].*com/);
  });

  it.each([
    ['/', Home],
    ['/development', DevelopmentPage],
  ])('%s', (_route, Page) => {
    const html = renderToString(<Page />);

    expect(html).not.toContain(ADDRESS);
    expect(html).not.toContain('mailto:');
  });

  it('content.ts and content.json', () => {
    expect(JSON.stringify(content)).not.toContain(ADDRESS);
    expect(JSON.stringify(contentJson)).not.toContain(ADDRESS);
  });
});
