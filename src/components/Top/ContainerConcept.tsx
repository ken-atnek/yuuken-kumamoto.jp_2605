/* =======================================
 * 株式会社 雄建  CONCEPT
 * URL:src/components/Top/ContainerConcept.tsx
 * Referenced in: : /app/page.tsx
 * Created: 2026-04-04
 * Last updated: 2026-04-04
 * ======================================= */

import styles from '@/styles/PageTop.module.scss';
import Image from 'next/image';
export default function ContainerConcept() {
  return (
    <section className={styles.containerConcept}>
      <article>
        <div className={styles.boxTitle}>
          <h2>concept</h2>
          <p className={styles.textJp}>
            常に寄り添い、丁寧に理想に向かって
            <br />
            未来の理想の空間づくり。
            <br />
            完成という目的地にある喜びに、
            <br />
            共にたどり着くために。
          </p>
        </div>
        <p className={styles.textEn}>
          Design fast
          <br />
          and
          <br />
          client fast.
          <br />
          Life is
          <br />
          Journey.
        </p>
      </article>
      <div className={styles.itemImage}>
        <Image
          alt="コンセプト画像"
          src="/images/concept-image.webp"
          width={930}
          height={300}
        />
      </div>
    </section>
  );
}
