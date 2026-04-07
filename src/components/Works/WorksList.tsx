/* =======================================
 * 株式会社 雄建  WORKS 一覧
 * URL: src/components/Works/WorksList.tsx
 * Created: 2026-04-06
 * ======================================= */

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import type { WorksData, WorkItem, WorkCategory } from '@/types/works';
import WorksModal from './WorksModal';
import styles from '@/styles/PageWorks.module.scss';

export default function WorksList() {
  const [data, setData] = useState<WorksData | null>(null);
  const [selectedItem, setSelectedItem] = useState<WorkItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<WorkCategory | null>(
    null
  );

  useEffect(() => {
    fetch('/db/works/works.json', { cache: 'no-store' })
      .then((res) => res.json())
      .then((json: WorksData) => setData(json));
  }, []);

  if (!data) return null;

  return (
    <>
      <article>
        {data.categories.map((category, categoryIndex) => (
          <div key={category.id} className={styles.categorySection}>
            <div className={styles.categoryHeader}>
              <h3 className={styles.categoryLabel}>
                {category.label.split('\n').map((line, i, arr) => (
                  <span key={i}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </span>
                ))}
              </h3>
              <p>{category.labelJp}</p>
            </div>

            {category.items.length > 0 && (
              <ul className={styles.itemGrid}>
                {category.items.map((item, itemIndex) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedItem(item);
                        setSelectedCategory(category);
                      }}
                    >
                      <Image
                        src={item.thumbnail}
                        alt={item.name}
                        width={600}
                        height={400}
                        priority={categoryIndex === 0 && itemIndex === 0}
                        loading={categoryIndex === 0 && itemIndex === 0 ? 'eager' : 'lazy'}
                      />
                      <div className={styles.itemMeta}>
                        {item.location && (
                          <p className={styles.itemLocation}>{item.location}</p>
                        )}
                        <p className={styles.itemName}>{item.name}</p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </article>

      {selectedItem && selectedCategory && (
        <WorksModal
          item={selectedItem}
          category={selectedCategory}
          onClose={() => {
            setSelectedItem(null);
            setSelectedCategory(null);
          }}
        />
      )}
    </>
  );
}
