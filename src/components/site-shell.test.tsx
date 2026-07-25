import { describe, expect, it } from 'vitest';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderRoute } from '@/test/render-route';
import { stubMatchMedia } from '@/test/match-media';
import HomePage from '@/app/page';

function prefersDarkOS(): void {
  stubMatchMedia({ prefersDark: true });
}

describe('site chrome', () => {
  it('navigates to every screen from the header', () => {
    renderRoute(<HomePage />);

    const nav = screen.getByRole('navigation', { name: 'Main' });

    expect(within(nav).getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(within(nav).getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about');
    expect(within(nav).getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '/projects');
    expect(within(nav).getByRole('link', { name: 'Blog' })).toHaveAttribute('href', '/blog');
    expect(within(nav).getByRole('link', { name: 'Resume' })).toHaveAttribute('href', '/resume');
  });

  it('marks the current screen as the active nav item', () => {
    renderRoute(<HomePage />, '/projects');

    const nav = screen.getByRole('navigation', { name: 'Main' });

    expect(within(nav).getByRole('link', { name: 'Projects' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(within(nav).getByRole('link', { name: 'Blog' })).not.toHaveAttribute('aria-current');
  });

  it('links the footer to the andersonbegossi profiles and the email', () => {
    renderRoute(<HomePage />);

    const footer = screen.getByRole('contentinfo');

    expect(within(footer).getByText('© 2026 Anderson Begossi')).toBeInTheDocument();
    expect(within(footer).getByRole('link', { name: 'GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/andersonbegossi',
    );
    expect(within(footer).getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
      'href',
      'https://linkedin.com/in/andersonbegossi-b5065a130',
    );
    expect(within(footer).getByRole('link', { name: 'Email' })).toHaveAttribute(
      'href',
      'mailto:andersonbegossi@gmail.com',
    );
  });
});

describe('theme', () => {
  it('defaults to the OS preference', () => {
    prefersDarkOS();

    renderRoute(<HomePage />);

    expect(document.documentElement.dataset.theme).toBe('dark');
  });

  it('falls back to light when the OS prefers light', () => {
    renderRoute(<HomePage />);

    expect(document.documentElement.dataset.theme).toBe('light');
  });

  it('switches the theme when the toggle is used', async () => {
    const user = userEvent.setup();
    renderRoute(<HomePage />);

    await user.click(screen.getByRole('button', { name: 'Toggle theme' }));

    expect(document.documentElement.dataset.theme).toBe('dark');

    await user.click(screen.getByRole('button', { name: 'Toggle theme' }));

    expect(document.documentElement.dataset.theme).toBe('light');
  });

  it('remembers the visitor’s choice over the OS preference', async () => {
    const user = userEvent.setup();
    prefersDarkOS();
    renderRoute(<HomePage />);

    await user.click(screen.getByRole('button', { name: 'Toggle theme' }));

    expect(localStorage.getItem('ab-theme')).toBe('light');
  });

  it('restores the stored choice on the next visit', () => {
    localStorage.setItem('ab-theme', 'dark');

    renderRoute(<HomePage />);

    expect(document.documentElement.dataset.theme).toBe('dark');
  });
});
