// @splidejs/react-splide の package.json exports に types 条件がないため手動宣言

declare module '@splidejs/react-splide/css' {}

declare module '@splidejs/react-splide' {
  import type {
    ForwardRefExoticComponent,
    RefAttributes,
    ComponentType,
    HTMLAttributes,
  } from 'react';

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
    isNavigation?: boolean;
    fixedWidth?: number | string;
    fixedHeight?: number | string;
    [key: string]: unknown;
  }

  /** コア Splide インスタンス（splide プロパティ経由でアクセス） */
  export interface SplideCore {
    sync: (splide: SplideCore) => void;
  }

  /** React コンポーネント ref で得られるインスタンス */
  export interface SplideRef {
    splide: SplideCore | null;
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

  export const Splide: ForwardRefExoticComponent<SplideProps & RefAttributes<SplideRef>>;
  export const SplideSlide: ComponentType<SplideSlideProps>;
  export const SplideTrack: ComponentType<HTMLAttributes<HTMLDivElement>>;
}
