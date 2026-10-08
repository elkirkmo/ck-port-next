import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { render, screen, within } from '@testing-library/react';

let pathname = '/';
jest.mock('next/navigation', () => ({ usePathname: () => pathname }));

// Imported after the mock is registered.
const load = async () => (await import('./StickyHeader')).default;

describe('StickyHeader', () => {
  beforeEach(() => {
    pathname = '/';
  });

  it('links home and to real sections, with no placeholder controls', async () => {
    const StickyHeader = await load();
    render(<StickyHeader />);
    const nav = screen.getByRole('navigation', { name: 'Main' });

    expect(screen.getByRole('link', { name: 'Chris Kirkham' })).toHaveAttribute('href', '/');
    expect(within(nav).getByRole('link', { name: 'Development' })).toHaveAttribute('href', '/development');
    expect(within(nav).getByRole('link', { name: 'Live' })).toHaveAttribute('href', '/live');
    expect(within(nav).getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/development#contact');
    for (const link of screen.getAllByRole('link')) {
      expect(link.getAttribute('href')).not.toBe('#');
    }
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it.each([
    ['/', 'Chris Kirkham'],
    ['/development', 'Development'],
    ['/live', 'Live'],
  ])('marks only the current page on %s', async (path, current) => {
    pathname = path;
    const StickyHeader = await load();
    render(<StickyHeader />);

    for (const link of screen.getAllByRole('link')) {
      if (link.textContent === current) {
        expect(link).toHaveAttribute('aria-current', 'page');
      } else {
        expect(link).not.toHaveAttribute('aria-current');
      }
    }
  });
});
