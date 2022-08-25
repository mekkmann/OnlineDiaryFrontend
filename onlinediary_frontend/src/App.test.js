import { render, screen } from '@testing-library/react';
import App from './App';
import Splash from './components/splash'

test('renders title', () => {
  render(<Splash />);
  const linkElement = screen.getByText('Why keep a diary?');
  expect(linkElement).toBeInTheDocument();
});
