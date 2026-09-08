/* =======================================
 * 株式会社 雄建  HERO
 * URL:src/components/Top/ContainerHero.tsx
 * Referenced in: : /app/page.tsx
 * Created: 2026-04-04
 * Last updated: 2026-04-04
 * ======================================= */

import styles from '@/styles/PageTop.module.scss';
import Image from 'next/image';
export default function ContainerHero() {
  const headText = 'MAKING IDEAL.';

  return (
    <section className={styles.containerHero}>
      <div className={styles.itemImage}>
        <Image
          alt="雄建のトップ画像"
          src="/images/hero.webp"
          width={1680}
          height={768}
          priority
          loading="eager"
        />
      </div>
      <article>
        <div className={styles.itemLogo}>
          <svg role="img" aria-labelledby="logoTitle">
            <title id="logoTitle">株式会社 雄建</title>
            <use href="#svg_logo" />
          </svg>
        </div>
        <div className={styles.headText}>
          {Array.from(headText).map((char, index) => (
            <span key={`${char}-${index}`}>{char}</span>
          ))}
        </div>
        <p>Design fast and client fast. Life is Journey.</p>
      </article>
    </section>
  );
}
