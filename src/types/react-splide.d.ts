// @splidejs/react-splide の package.json exports に types 条件がないため手動宣言
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare module '@splidejs/react-splide' {
  import type { ComponentType, HTMLAttributes } from 'react';

  export interface SplideOptions {
    type?: 'slide' | 'loop' | 'fade';
    perPage?: number;
    perMove?: number;
    gap?: string | number;
    pagination?: boolean;
    arrows?: boolean;
    autoplay?: boolean | 'pause';
    interval?: number;
    speed?: number;
    rewind?: boolean;
    drag?: boolean | 'free';
    [key: string]: unknown;
  }

  export interface SplideProps extends HTMLAttributes<HTMLDivElement> {
    options?: SplideOptions;
    tag?: string;
    extensions?: Record<string, unknown>;
    transition?: unknown;
    hasTrack?: boolean;
  }

  export interface SplideSlideProps extends HTMLAttributes<HTMLLIElement> {
    tag?: string;
  }

  export const Splide: ComponentType<SplideProps>;
  export const SplideSlide: ComponentType<SplideSlideProps>;
  export const SplideTrack: ComponentType<HTMLAttributes<HTMLDivElement>>;
}
