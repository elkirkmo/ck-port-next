import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import content from '../content';
import FAQSection from './FAQ';

describe('FAQSection', () => {
  it('shows the protected email control in the contact answer, not the address', async () => {
    render(<FAQSection arr={content.FAQ} />);

    await userEvent.click(
      screen.getByRole('button', { name: 'How can I contact Chris Kirkham?' })
    );

    expect(screen.getByRole('button', { name: 'Show email address' })).toBeInTheDocument();
    expect(document.body.innerHTML).not.toContain('me@chriskirkham.com');
  });
});
