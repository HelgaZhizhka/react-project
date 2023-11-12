import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import NotFoundPage from './NotFoundPage';

describe('NotFoundPage Component', () => {
  test('displays when navigating to an invalid route', () => {
    render(
      <MemoryRouter initialEntries={['/some/non-existent/route']}>
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="details/:id" element={<h1>Details Page</h1>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText("Sorry, there's nothing here 🥲")).toBeInTheDocument();
    expect(screen.getByText('Go to home page')).toBeInTheDocument();
  });
});
