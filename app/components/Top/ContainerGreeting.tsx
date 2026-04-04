/* =======================================
 * クラブ智 ご挨拶
 * URL:src/components/Top/ContainerGreeting.tsx
 * Referenced in: : /app/page.tsx
 * Created: 2026-03-24
 * Last updated: 2026-03-25
 * ======================================= */

import styles from '@/styles/PageTop.module.scss';

export default function ContainerGreeting() {
  return (
    <section className={styles.containerGreeting} id="ContainerGreeting">
      <svg
        width="0"
        height="0"
        aria-hidden="true"
        style={{ position: 'absolute' }}
      >
        <defs>
          <clipPath id="greeting-mask" clipPathUnits="objectBoundingBox">
            <path d="M0 1 L0.6828 1 C0.6828 1 0.5908 0.9580 0.6381 0.8095 C0.6852 0.6602 0.9527 0.5142 0.9942 0.2681 C1.0247 0.0903 0.8960 0 0.8960 0 H0 V1 Z" />
          </clipPath>
        </defs>
      </svg>
      <article>
        <h2>
          クラブ智で過ごす、<span>特別なお時間を是非。</span>
        </h2>
        <h3>ご挨拶</h3>
        <p>
          平素より格別のご愛顧を賜り、
          <br className="sp" />
          誠にありがとうございます。
          <br />
          <br />
          クラブ智にお越し頂いた皆様が
          <br />
          心から落ち着く空間をコンセプトに
          <br />
          これからも感謝の気持ちを忘れず、
          <br />
          皆様に愛されるお店を目指してまいります。
          <br />
          <br />
          クラブ智へのご来店を、
          <br />
          スタッフ一同心よりお待ちいたしております。
        </p>
      </article>
    </section>
  );
}
