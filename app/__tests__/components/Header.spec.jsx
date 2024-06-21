import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Header from '../../components/Header';

describe('Header Component', () => {
  it('renders a heading', async () => {
    render(
      <Header
        name={'Test Testerson'}
        description="Blah Blah Blah"
        location={'Fake Location'}
      />
    );

    const heading = screen.getByText('Test Testerson');
    const description = screen.getByText('Blah Blah Blah');
    const location = screen.getByText('Based in Fake Location');
    const locationId = screen.queryByTestId('location-h3');

    expect(heading).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(location).toBeInTheDocument();
    expect(locationId).toBeInTheDocument();
  });
  it('does not render an h3 tag when location is ommitted', () => {
    render(<Header name={'Test Testerson2'} description="Blah Blah Blah2" />);

    const heading = screen.getByText('Test Testerson2');
    const description = screen.getByText('Blah Blah Blah2');
    const location = screen.queryByTestId('location-h3') || null;

    expect(heading).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(location).not.toBeInTheDocument();
  });
});
