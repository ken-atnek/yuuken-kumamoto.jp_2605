/* =======================================
 * メニュー項目
 * URL: src/data/navMenuData.ts
 * Created:2026-04-04
 * Last updated: 2026-04-04
 * ======================================= */

export type NavMenuItem = {
  href: string;
  label: string;
};

export const navMenu: NavMenuItem[] = [
  { href: '/', label: 'home' },
  { href: '/', label: 'concept' },
  { href: '/', label: 'works' },
  { href: '/', label: 'about' },
  { href: '/', label: 'contact' },
];
