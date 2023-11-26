import { render, screen } from '@testing-library/react';
import Page404 from '@/pages/404';

describe('404 Page', () => {
  it('displays the correct content', () => {
    render(<Page404 />);

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText("Sorry, there's nothing here 🥲")).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/');
  });
});
