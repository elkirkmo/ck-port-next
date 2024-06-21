/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';
import Header from '../../components/Header';

it('renders Header Component with name and description', () => {
  const { container } = render(
    <Header name="test testerson" description="test test test" />
  );
  expect(container).toMatchSnapshot();
});
it('renders Header Component with name and description and location', () => {
  const { container } = render(
    <Header
      name="test testerson"
      description="test test test"
      location="Kissimme FL"
    />
  );
  expect(container).toMatchSnapshot();
});
