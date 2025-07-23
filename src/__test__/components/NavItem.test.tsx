import { render, screen, fireEvent } from '@testing-library/react'
import { NavItem } from 'src/components/NavItem'
import { useRouter } from 'next/router';
import {describe, it, afterEach, expect, jest} from '@jest/globals'
import '@testing-library/jest-dom/jest-globals';
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('NavItem component', () => {
  const mockUseRouter = useRouter as jest.Mock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the content correctly', () => {
    mockUseRouter.mockReturnValue({ pathname: '/other-path' });
    render(<NavItem href="/test" content="Test Content" />);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('sets the href attribute correctly when not active', () => {
    mockUseRouter.mockReturnValue({ pathname: '/other-path' });
    render(<NavItem href="/test" content="Test Content" />);
    const linkElement = screen.getByText('Test Content');
    expect(linkElement).toHaveAttribute('href', '/test');
  });

  it('sets the href attribute to undefined when active', () => {
    mockUseRouter.mockReturnValue({ pathname: '/test' });
    render(<NavItem href="/test" content="Test Content" />);
    const linkElement = screen.getByText('Test Content');
    expect(linkElement).not.toHaveAttribute('href');
  });

  it('prevents default behavior when clicking on an active link', () => {
    mockUseRouter.mockReturnValue({ pathname: '/test' });
    render(<NavItem href="/test" content="Test Content" />);
    const linkElement = screen.getByText('Test Content');
    const mockPreventDefault = jest.fn();
    fireEvent.click(linkElement, { preventDefault: mockPreventDefault });
    expect(mockPreventDefault).toHaveBeenCalledTimes(1);
  });

  it('sets the cursor style correctly when active', () => {
    mockUseRouter.mockReturnValue({ pathname: '/test' });
    render(<NavItem href="/test" content="Test Content" />);
    const linkElement = screen.getByText('Test Content');
    expect(linkElement).toHaveStyle('cursor: default');
  });

  it('sets the cursor style correctly when not active', () => {
    mockUseRouter.mockReturnValue({ pathname: '/other-path' });
    render(<NavItem href="/test" content="Test Content" />);
    const linkElement = screen.getByText('Test Content');
    expect(linkElement).toHaveStyle('cursor: pointer');
  });

  it('sets the tabIndex correctly when active', () => {
    mockUseRouter.mockReturnValue({ pathname: '/test' });
    render(<NavItem href="/test" content="Test Content" />);
    const linkElement = screen.getByText('Test Content');
    expect(linkElement).toHaveAttribute('tabindex', '-1');
  });

  it('sets the tabIndex correctly when not active', () => {
    mockUseRouter.mockReturnValue({ pathname: '/other-path' });
    render(<NavItem href="/test" content="Test Content" />);
    const linkElement = screen.getByText('Test Content');
    expect(linkElement).toHaveAttribute('tabindex', '0');
  });

  it('sets the aria-current attribute correctly when active', () => {
    mockUseRouter.mockReturnValue({ pathname: '/test' });
    render(<NavItem href="/test" content="Test Content" />);
    const linkElement = screen.getByText('Test Content');
    expect(linkElement).toHaveAttribute('aria-current', 'page');
  });

  it('does not set the aria-current attribute when not active', () => {
    mockUseRouter.mockReturnValue({ pathname: '/other-path' });
    render(<NavItem href="/test" content="Test Content" />);
    const linkElement = screen.getByText('Test Content');
    expect(linkElement).not.toHaveAttribute('aria-current');
  });
});
