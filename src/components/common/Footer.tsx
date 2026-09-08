/* =======================================
 *株式会社 雄建 FOOTER
 * URL: src/components/common/Footer.tsx
 * Created: 2026-04-04
 * Last updated: 2026-04-04
 * ======================================= */
import { navMenu } from '@/data/navMenuData';
import styles from './Footer.module.scss';
import ExternalLink from '@/components/common/ExternalLink';
const Footer = () => {
  return (
    <footer className={styles.containerFooter}>
      <div className={styles.itemLogo}>
        <svg role="img" aria-labelledby="logoTitleFooter">
          <title id="logoTitleFooter">株式会社 雄建</title>
          <use href="#svg_logo" />
        </svg>
      </div>
      <div className={styles.copyright}>©2026 YU-KEN CO., LTD.</div>
      <nav>
        {navMenu.map((item) => (
          <a href={item.href} key={`${item.href}-${item.label}`}>
            {item.label}
          </a>
        ))}
      </nav>
      <div className={styles.boxShopInfo}>
        <address>熊本県上益城郡益城町砥川1916-10</address>
        <ExternalLink href="tel:096-201-7770" className={styles.tel}>
          tel.096-201-7770
        </ExternalLink>
        <span className={styles.fax}>fax.096-201-7771</span>
        <div>
          <ExternalLink
            href="https://maps.app.goo.gl/i7X2m9nXW5SUpWKQ8"
            className={styles.itemMap}
          >
            Google Map
          </ExternalLink>
          <ExternalLink
            href="mailto:info@yu-ken.co.jp"
            className={styles.itemMail}
          >
            info@yu-ken.co.jp
          </ExternalLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
