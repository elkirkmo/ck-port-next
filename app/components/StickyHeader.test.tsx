import { describe, expect, it } from '@jest/globals';
import { render, screen, within } from '@testing-library/react';
import StickyHeader from './StickyHeader';

describe('StickyHeader', () => {
  it('links home and to real sections, with no placeholder controls', () => {
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
});
