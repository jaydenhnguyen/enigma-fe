import React from 'react';
import Link from '@mui/material/Link';
import { useRouter } from 'next/router';
import classes from './NavItem.module.scss';

type Props = {
  href: string;
  content: string;
};

export function NavItem({ href, content }: Props): React.ReactElement {
  const router = useRouter();
  const isActive = router.pathname === href;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isActive) {
      e.preventDefault();
    }
  };

  return (
    <Link
      href={isActive ? undefined : href}
      underline="none"
      className={classes['nav-item']}
      onClick={handleClick}
      style={{ cursor: isActive ? 'default' : 'pointer' }}
      tabIndex={isActive ? -1 : 0}
      aria-current={isActive ? 'page' : undefined}
    >
      {content}
    </Link>
  );
}
