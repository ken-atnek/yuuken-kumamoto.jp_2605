/* =======================================
 * クラブ智 HEADER
 * URL: src/components/common/Header.tsx
 * Created: 2026-03-23
 * Last updated: 2026-03-24
 * ======================================= */
import Image from 'next/image';
import styles from './Header.module.scss';
import ExternalLink from '@/components/common/ExternalLink';

const Header = () => {
  return (
    <header className={styles.containerHeader} id="ContainerHeader">
      <article>
        <h1>
          <svg role="img" aria-labelledby="logoTitle">
            <title id="logoTitle">クラブ智</title>
            <use href="#svg_logo" />
          </svg>
        </h1>
        <span className={styles.itemTime}>
          <i>open</i>20:00〜
        </span>
        <ExternalLink href="tel:096-228-8333" className={styles.linkTel}>
          096-228-8333
        </ExternalLink>
        <ExternalLink
          href="https://maps.app.goo.gl/URTCqCiTC1fHAJeS9"
          className={styles.linkMap}
        >
          <span>map</span>
        </ExternalLink>

        <nav>
          <a href="#ContainerHeader">TOP</a>
          <a href="#ContainerGreeting">ご挨拶</a>
          <a href="#ContainerSystem">システム</a>
          <a href="#ContainerRoomInfo">お部屋紹介</a>
          <a href="#ContainerRecruit">求人</a>
          <a href="#ContainerAccess">アクセス</a>
        </nav>
      </article>
    </header>
  );
};

export default Header;
