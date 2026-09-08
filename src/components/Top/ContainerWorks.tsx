/* =======================================
 * 株式会社 雄建  TOP WORKS セクション
 * URL: src/components/Top/ContainerWorks.tsx
 * Created: 2026-04-06
 * ======================================= */

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { WorksData } from '@/types/works';
import styles from '@/styles/PageTop.module.scss';

export default function ContainerWorks() {
  const [data, setData] = useState<WorksData | null>(null);

  useEffect(() => {
    fetch('/db/works/works.json', { cache: 'no-store' })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load works data: ${res.status}`);
        }

        return res.json();
      })
      .then((json: WorksData) => setData(json))
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!data) return null;

  return (
    <section className={styles.containerWorks}>
      <h2>works</h2>
      <article className={styles.categoryList}>
        {data.categories.map((category) => {
          const sortedItems = [...category.items].sort((a, b) =>
            b.id.localeCompare(a.id, undefined, { numeric: true })
          );
          const thumb1 = sortedItems[0]?.thumbnail;
          const thumb2 = sortedItems[1]?.thumbnail;

          return (
            <div key={category.id} className={styles.blockCategory}>
              {/* サムネイル2枚 */}
              <div className={styles.thumbPair}>
                <div className={styles.thumbItem}>
                  {thumb1 && (
                    <Image
                      src={thumb1}
                      alt={sortedItems[0].name}
                      width={600}
                      height={400}
                      style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%',
                      }}
                    />
                  )}
                </div>
                <div className={styles.thumbItem}>
                  {thumb2 && (
                    <Image
                      src={thumb2}
                      alt={sortedItems[1].name}
                      width={600}
                      height={400}
                      style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%',
                      }}
                    />
                  )}
                </div>
              </div>
              <div className={styles.categoryHeader}>
                <h3>works</h3>
                <h4 className={styles.categoryLabel}>{category.label}</h4>
              </div>
              {/* カテゴリ名 + 矢印ボタン */}
              <div className={styles.categoryMeta}>
                <div className={styles.categoryName}>
                  <p className={styles.nameEn}>
                    {category.label.split('\n').map((line, i, arr) => (
                      <span key={i}>
                        {line}
                        {i < arr.length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                  <p className={styles.nameJp}>{category.labelJp}</p>
                </div>
                <Link
                  href="/works/"
                  aria-label={`${category.label}の一覧へ`}
                ></Link>
              </div>
            </div>
          );
        })}
      </article>

      {/* VIEW ALL WORKS */}
      <div className={styles.viewAll}>
        <Link href="/works/">
          <span>VIEW ALL WORKS</span>
        </Link>
      </div>
    </section>
  );
}
