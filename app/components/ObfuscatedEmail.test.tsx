import { afterEach, describe, expect, it, jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ObfuscatedEmail from './ObfuscatedEmail';

const ADDRESS = 'me@chriskirkham.com';

describe('ObfuscatedEmail', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('keeps the address out of the initial client render', () => {
    const { container } = render(<ObfuscatedEmail label="Email me" />);

    expect(container.innerHTML).not.toContain(ADDRESS);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Email me' })).toBeInTheDocument();
  });

  it('reveals the address, focuses it and opens mailto on click', async () => {
    const open = jest.spyOn(window, 'open').mockImplementation(() => null);
    render(<ObfuscatedEmail label="Email me" />);

    await userEvent.click(screen.getByRole('button', { name: 'Email me' }));

    const link = screen.getByRole('link', { name: ADDRESS });
    expect(link).toHaveAttribute('href', `mailto:${ADDRESS}`);
    expect(link).toHaveFocus();
    expect(open).toHaveBeenCalledWith(`mailto:${ADDRESS}`, '_self');
  });
});
