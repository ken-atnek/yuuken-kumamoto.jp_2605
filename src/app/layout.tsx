/* =======================================
 *株式会社 雄建 Layout
 * URL:src/app/layout.tsx
 * Created: 2026-04-04
 * Last updated: 2026-04-04
 * ======================================= */

import type { Metadata } from 'next';
import '@/styles/globals.scss';
import SvgDefs from '@/components/SvgDefs';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { isRealProduction, metadataBase } from '@/lib/env';
import { Noto_Sans_JP } from 'next/font/google';
import localFont from 'next/font/local';

const notoSansJp = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--font-jp',
  display: 'swap',
});

const poppins = localFont({
  src: [
    {
      path: '../assets/fonts/Poppins-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Poppins-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Poppins-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Poppins-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Poppins-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  ...(isRealProduction && {
    metadataBase,
    openGraph: {
      url: metadataBase?.toString(),
      type: 'website',
      images: [
        {
          url: '/ogp.jpg',
          width: 1200,
          height: 630,
          alt: '株式会社 雄建のOGP画像',
        },
      ],
    },
  }),
  robots: isRealProduction ? 'index, follow' : 'noindex, nofollow',
  icons: {
    icon: [
      {
        url: '/favicon/favicon-light.svg',
        media: '(prefers-color-scheme: light)',
        type: 'image/svg+xml',
      },
      {
        url: '/favicon/favicon-dark.svg',
        media: '(prefers-color-scheme: dark)',
        type: 'image/svg+xml',
      },
      // { url: '/favicon/favicon.ico', type: 'image/x-icon' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${notoSansJp.variable} ${poppins.variable}`}
      data-scroll-behavior="smooth"
    >
      <head>
        <meta
          name="format-detection"
          content="telephone=no, address=no, email=no"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <SvgDefs />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
