/* =======================================
 * 株式会社 雄建  CONCEPT
 * URL:src/components/Top/ContainerAbout.tsx
 * Referenced in: : /app/page.tsx
 * Created: 2026-04-04
 * Last updated: 2026-04-04
 * ======================================= */

import ExternalLink from '@/components/common/ExternalLink';
import styles from '@/styles/PageTop.module.scss';
export default function ContainerAbout() {
  return (
    <section className={styles.containerAbout} id="ContainerAbout">
      <h2>about</h2>
      <article>
        <div className={styles.itemLogo}>
          <svg role="img" aria-labelledby="logoTitle">
            <title id="logoTitle">株式会社 雄建</title>
            <use href="#svg_logo" />
          </svg>
        </div>
        <dl>
          <div>
            <dt>社名</dt>
            <dd>株式会社雄建</dd>
          </div>
          <div>
            <dt>所在地</dt>
            <dd>
              <address>熊本県上益城郡益城町砥川1916-10</address>
            </dd>
          </div>
          <div>
            <dt>設立</dt>
            <dd>
              <time dateTime="2018-02-02">2018年2月2日</time>
            </dd>
          </div>
          <div>
            <dt>資本金</dt>
            <dd>2,000,000円</dd>
          </div>
          <div>
            <dt>代表</dt>
            <dd>蓑田 雄作</dd>
          </div>
          <div>
            <dt>電話番号</dt>
            <dd>
              <ExternalLink href="tel:096-201-7770" className={styles.tel}>
                096-201-7770
              </ExternalLink>
            </dd>
          </div>
          <div>
            <dt>事業内容</dt>
            <dd>
              <ul>
                <li>新築工事・リノベーション工事・リフォーム工事</li>
                <li>増改築工事・外壁工事・屋根工事・内装工事・外構工事</li>
                <li>耐震補強工事・水回り工事（キッチン・浴室・トイレ）</li>
                <li>断熱工事・設備工事・店舗改装・店舗工事</li>
                <li>住宅メンテナンス・解体工事・基礎工事</li>
                <li>エクステリア工事・バリアフリー工事</li>
              </ul>
            </dd>
          </div>
        </dl>
      </article>
    </section>
  );
}
