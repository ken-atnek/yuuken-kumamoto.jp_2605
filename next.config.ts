import type { NextConfig } from 'next';
import path from 'path';
const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizeCss: false,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')], // ここでルートを設定
  },
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  allowedDevOrigins: ['192.168.9.21', '192.168.7.21'],

  ...(isProd && {
    assetPrefix: '', // ここを `""` に変更
  }),
};

export default nextConfig;
