/* =======================================
 *株式会社 雄建 HEADER
 * URL: src/components/common/Header.tsx
 * Created: 2026-03-23
 * Last updated: 2026-03-24
 * ======================================= */
'use client';
import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import styles from './Header.module.scss';
import clsx from 'clsx';
import { navMenu } from '@/data/navMenuData';

const HeaderInner = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        isOpen &&
        navRef.current &&
        buttonRef.current &&
        !navRef.current.contains(target) &&
        !buttonRef.current.contains(target)
      ) {
        closeMenu();
      }
    };
    document.addEventListener('click', handleOutsideClick, true);
    return () =>
      document.removeEventListener('click', handleOutsideClick, true);
  }, [isOpen]);

  return (
    <header className={styles.containerHeader}>
      <article
        className={clsx(
          styles.blockMenu,
          isOpen && styles.isOpen,
          !isOpen && styles.closing
        )}
        ref={navRef}
      >
        <nav>
          {navMenu.map((item) => (
            <a
              href={item.href}
              onClick={closeMenu}
              key={`${item.href}-${item.label}`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </article>
      <button
        type="button"
        ref={buttonRef}
        className={`${styles.hamburgerButton} ${
          isOpen ? styles['is-open'] : ''
        }`}
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-label="メニューを開閉"
      >
        <span></span>
        <span></span>
      </button>
    </header>
  );
};

const Header = () => {
  const pathname = usePathname();
  return <HeaderInner key={pathname} />;
};

export default Header;
