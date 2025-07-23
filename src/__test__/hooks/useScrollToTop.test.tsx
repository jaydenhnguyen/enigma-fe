import { render } from '@testing-library/react';
import { useScrollToTop } from 'src/hooks';
import {describe, it, beforeEach, expect, jest} from '@jest/globals'
import '@testing-library/jest-dom/jest-globals';

// Mock scrollTo
window.scrollTo = jest.fn();

// Component that passes pathname as prop
const TestWrapper = ({ pathname }: { pathname: string }) => {
  jest.mock('next/router', () => ({
    useRouter: () => ({ pathname }),
  }));
  useScrollToTop();
  return <div>Test</div>;
};

describe('useScrollToTop', () => {
  beforeEach(() => {
    jest.resetModules(); 
    jest.clearAllMocks();
  });

  it('calls window.scrollTo on mount and when pathname changes', async () => {
    const { rerender } = render(<TestWrapper pathname="/initial" />);
    expect(window.scrollTo).toHaveBeenCalledTimes(1);

    rerender(<TestWrapper pathname="/new-path" />);
    expect(window.scrollTo).toHaveBeenCalledTimes(2);
  });
});
