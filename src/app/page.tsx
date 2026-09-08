/* =======================================
 *株式会社 雄建 TOPページ
 * URL: src/app/page.tsx
 * Created: 2026-04-04
 * Last updated: 2026-04-04
 * ======================================= */

import type { Metadata } from 'next';
import { isRealProduction } from '@/lib/env';
import ContainerHero from '@/components/Top/ContainerHero';
import ContainerConcept from '@/components/Top/ContainerConcept';
import ContainerAbout from '@/components/Top/ContainerAbout';
import ContainerWorks from '@/components/Top/ContainerWorks';
import ContainerContact from '@/components/Top/ContainerContact';

export const generateMetadata = (): Metadata => {
  return {
    title: '株式会社 雄建｜熊本県上益城郡益城町の建築工事',
    description: isRealProduction
      ? '熊本県上益城郡益城町で建築工事、大工工事、屋根工事、タイル・ブロック工事、内装仕上工事などの建設工事を行っております。'
      : undefined,
    alternates: isRealProduction ? { canonical: '/' } : undefined,
    openGraph: isRealProduction ? { url: '/' } : undefined,
  };
};
export default function Home() {
  return (
    <>
      <ContainerHero />
      <ContainerConcept />
      <ContainerWorks />
      <ContainerAbout />
      <ContainerContact />
    </>
  );
}
