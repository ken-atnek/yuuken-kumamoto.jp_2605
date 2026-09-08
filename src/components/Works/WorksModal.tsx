/* =======================================
 * 株式会社 雄建  WORKS モーダル（Splide）
 * URL: src/components/Works/WorksModal.tsx
 * Created: 2026-04-06
 * ======================================= */

'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import type { SplideRef } from '@splidejs/react-splide';
import type { WorkItem, WorkCategory } from '@/types/works';
import styles from './WorksModal.module.scss';

interface WorksModalProps {
  item: WorkItem;
  category: WorkCategory;
  onClose: () => void;
}

export default function WorksModal({
  item,
  category,
  onClose,
}: WorksModalProps) {
  const mainRef = useRef<SplideRef | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // メインスライダーの移動でactiveIndex同期
  useEffect(() => {
    type EventEmitter = {
      on(event: string, cb: (...args: unknown[]) => void): void;
      off(event: string): void;
    };
    const splide = mainRef.current?.splide as unknown as
      | EventEmitter
      | undefined;
    if (!splide) return;
    // Splide v4: move イベントの第1引数が newIndex
    splide.on('move', (...args: unknown[]) =>
      setActiveIndex(args[0] as number)
    );
    return () => splide.off('move');
  }, []);

  // スクロールロック
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="works-modal-title"
    >
      <button
        ref={closeButtonRef}
        type="button"
        className={styles.btnClose}
        onClick={onClose}
        aria-label="施工事例モーダルを閉じる"
      >
        <span />
        <span />
      </button>
      <div className={styles.inner} onClick={(e) => e.stopPropagation()}>
        <div className={styles.titleWrap}>
          {item.location && (
            <p className={styles.titleLocation}>{item.location}</p>
          )}
          <p id="works-modal-title" className={styles.titleName}>
            {item.name}
          </p>
        </div>
        <div className={styles.sliderWrap}>
          <div className={styles.categoryHeader}>
            <h3>works</h3>
            <h4 className={styles.categoryLabel}>{category.label}</h4>
          </div>
          {/* メインスライダー */}
          <Splide
            ref={mainRef}
            hasTrack={false}
            options={{
              type: 'loop',
              pagination: false,
              arrows: true,
            }}
            className={styles.mainSlider}
          >
            <SplideTrack>
              {item.images.map((src, i) => (
                <SplideSlide key={i}>
                  <div className={styles.mainSlide}>
                    <Image
                      src={src}
                      alt={`${item.name} ${i + 1}`}
                      width={1200}
                      height={800}
                      style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%',
                      }}
                    />
                  </div>
                </SplideSlide>
              ))}
            </SplideTrack>
          </Splide>

          {/* サムネイルgrid */}
          {item.images.length > 1 && (
            <div className={styles.thumbGrid}>
              {item.images.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  className={`${styles.thumbItem} ${i === activeIndex ? styles.thumbActive : ''}`}
                  onClick={() => {
                    (
                      mainRef.current?.splide as unknown as
                        | { go: (index: number) => void }
                        | undefined
                    )?.go(i);
                    setActiveIndex(i);
                  }}
                >
                  <Image
                    src={src}
                    alt={`${item.name} サムネイル ${i + 1}`}
                    width={200}
                    height={140}
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
