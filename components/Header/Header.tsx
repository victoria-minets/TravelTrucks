'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import css from './Header.module.css';

const Header = () => {
  const pathname = usePathname();

  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home" className={css.headerLink}>
        <Image
          src="/logo.png"
          alt="TravelTrucks"
          width={136}
          height={16}
          priority
        />
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li className={css.navigationItem}>
            <Link
              href="/"
              className={`${css.navigationLink} ${
                pathname === '/' ? css.active : ''
              }`}
            >
              Home
            </Link>
          </li>
          <li className={css.navigationItem}>
            <Link
              href="/catalog"
              className={`${css.navigationLink} ${
                pathname.startsWith('/catalog') ? css.active : ''
              }`}
            >
              Catalog
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
