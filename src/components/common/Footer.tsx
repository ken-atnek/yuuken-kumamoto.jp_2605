/* =======================================
 *株式会社 雄建 FOOTER
 * URL: src/components/common/Footer.tsx
 * Created: 2026-03-23
 * Last updated: 2026-03-24
 * ======================================= */
'use client';
import styles from './Footer.module.scss';
import { useEffect, useState } from 'react';
const Footer = () => {
  const [showPageTop, setShowPageTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowPageTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
      <footer className={styles.containerFooter}></footer>
      <button
        type="button"
        className={`${styles.movePageTop} ${showPageTop ? styles.isShow : ''}`}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        aria-label="ページ上部へ戻る"
      />
    </>
  );
};

export default Footer;
