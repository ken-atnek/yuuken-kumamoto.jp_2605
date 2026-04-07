/* =======================================
 * 株式会社 雄建  WORKS ページ
 * URL: src/app/works/page.tsx
 * Created: 2026-04-06
 * ======================================= */

import type { Metadata } from 'next';
import { isRealProduction } from '@/lib/env';
import WorksList from '@/components/Works/WorksList';
import styles from '@/styles/PageWorks.module.scss';

export const generateMetadata = (): Metadata => {
  return {
    title: 'WORKS｜株式会社 雄建',
    description: isRealProduction
      ? '株式会社 雄建の施工実績です。リノベーション・新築・店舗オフィスなど、熊本を中心に多くの物件を手がけています。'
      : undefined,
  };
};

export default function WorksPage() {
  return (
    <section className={styles.pageWorks}>
      <h2>WORKS</h2>
      <WorksList />
    </section>
  );
}
