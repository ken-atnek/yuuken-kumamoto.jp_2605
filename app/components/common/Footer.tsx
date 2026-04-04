/* =======================================
 *クラブ智 FOOTER
 * URL: src/components/common/Footer.tsx
 * Created: 2026-03-23
 * Last updated: 2026-03-24
 * ======================================= */
'use client';
import styles from './Footer.module.scss';
import ExternalLink from '@/components/common/ExternalLink';
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
      <footer className={styles.containerFooter}>
        <article>
          <div className={styles.itemLogo}>
            <svg role="img" aria-labelledby="logoTitle">
              <title id="logoTitle">クラブ智</title>
              <use href="#svg_logo" />
            </svg>
          </div>
          <span className={styles.itemTime}>
            <i>open</i>20:00〜
          </span>
          <ExternalLink href="tel:096-228-8333" className={styles.linkTel}>
            096-228-8333
          </ExternalLink>
          <div className={styles.boxAddress}>
            <address>熊本市中央区新市街４-8 クレストビル新市街３F</address>
            <ExternalLink
              href="https://maps.app.goo.gl/URTCqCiTC1fHAJeS9"
              className={styles.linkMap}
            >
              <span>map</span>
            </ExternalLink>
          </div>
          <nav>
            <a href="#ContainerHeader">TOP</a>
            <a href="#ContainerGreeting">ご挨拶</a>
            <a href="#ContainerSystem">システム</a>
            <a href="#ContainerRoomInfo">お部屋紹介</a>
            <a href="#ContainerRecruit">求人</a>
            <a href="#ContainerAccess">アクセス</a>
          </nav>
          <hr />
          <div className={styles.copyright}>(C) 2018. クラブ智</div>
        </article>
      </footer>
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
