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
import ContainerContact from '@/components/Top/ContainerContact';

export const generateMetadata = (): Metadata => {
  return {
    title: '株式会社 雄建｜熊本の夜に新たなステージを',
    description: isRealProduction
      ? '「株式会社 雄建」は心から落ち着く空間をコンセプトに、これからも感謝の気持ちを忘れず、皆様に愛されるお店を目指してまいります。「株式会社 雄建」にお越しいただいた皆様の特別な時間を是非、「株式会社 雄建」の素敵な女性たちと一緒に過ごして頂ければ幸いです。熊本市中央区栄通り'
      : undefined,
  };
};
export default function Home() {
  return (
    <>
      <ContainerHero />
      <ContainerConcept />
      <ContainerAbout />
      <ContainerContact />
    </>
  );
}
