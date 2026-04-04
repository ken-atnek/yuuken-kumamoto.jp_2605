/* =======================================
 * クラブ智 TOPページ
 * URL: src/app/page.tsx
 * Created: 2026-03-23
 * Last updated: 2026-03-23
 * ======================================= */

import type { Metadata } from 'next';
import { isRealProduction } from '@/lib/env';
import ContainerGreeting from '@/components/Top/ContainerGreeting';
import ContainerSystem from '@/components/Top/ContainerSystem';
import ContainerRoomInfo from '@/components/Top/ContainerRoomInfo';
import ContainerAccess from '@/components/Top/ContainerAccess';
import ContainerRecruit from '@/components/Top/ContainerRecruit';

export const generateMetadata = (): Metadata => {
  return {
    title: 'クラブ智｜熊本の夜に新たなステージを',
    description: isRealProduction
      ? '「クラブ智」は心から落ち着く空間をコンセプトに、これからも感謝の気持ちを忘れず、皆様に愛されるお店を目指してまいります。「クラブ智」にお越しいただいた皆様の特別な時間を是非、「クラブ智」の素敵な女性たちと一緒に過ごして頂ければ幸いです。熊本市中央区栄通り'
      : undefined,
  };
};
export default function Home() {
  return (
    <>
      <ContainerGreeting />
      <ContainerSystem />
      <ContainerRoomInfo />
      <ContainerRecruit />
      <ContainerAccess />
    </>
  );
}
