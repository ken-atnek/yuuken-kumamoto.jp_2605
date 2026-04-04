/* =======================================
 * クラブ智 女性フロアキャスト募集
 * URL:src/components/Top/ContainerRecruit.tsx
 * Referenced in: : /app/page.tsx
 * Created: 2026-03-25
 * Last updated: 2026-03-25
 * ======================================= */

import ExternalLink from '@/components/common/ExternalLink';
import styles from '@/styles/PageTop.module.scss';
export default function ContainerRecruit() {
  return (
    <section className={styles.containerRecruit} id="ContainerRecruit">
      <article>
        <h2>女性フロアキャスト募集</h2>
        <p className={styles.sidebarH2}>
          クラブ智で<span>一緒に働きませんか？</span>
        </p>
        <p className={styles.announce}>
          ナイトワークデビューさん大歓迎！
          <br />
          お仕事はとってもカンタン♪
          <br className="sp" />
          ママのお手伝い感覚でOKです◎
          <br />
          働きやすさにこだわった良環境でゆっくりお仕事を覚えられるので完全初心者さんも安心してくださいね！
        </p>
        <div className={styles.boxDetails}>
          <div className={styles.wrapLeft}>
            <div className={styles.itemHead}>
              <span>
                体験入店日給：一律<em>20,000</em>円
              </span>
            </div>
            <div className={styles.innerDetails}>
              <h4>■体験入店随時受付中</h4>
              <p>
                まずは体験入店から始めてみませんか？
                <br />
                貸衣装もあるため事前準備は必要ありません！
                <br />
                見学だけ、質問だけだって大丈夫◎
                <br />
                ぜひお気軽にご連絡ください！
              </p>
            </div>
          </div>
          <div className={styles.wrapRight}>
            <div className={styles.itemHead}>
              <span>
                本入店時給： <br className="sp" />
                最低
                <em>3,000</em>円〜最大<em>8,000</em>円
              </span>
              <span>＋各種バック（売上50％制orスライド制）</span>
            </div>
            <div className={styles.innerDetails}>
              <h4>■働きやすさエリアTOPクラス！！</h4>
              <p>
                ・幅広い年齢層の方が活躍中 ・面倒な決まりごとなし
                <br />
                ・シフトは自由（短期勤務希望者さんも大歓迎♪）
                <br />
                ・出費なしでラクラク帰宅可
              </p>
            </div>
          </div>
        </div>
        <ExternalLink href="tel:09057316203" className={styles.linkTel}>
          求人問合せ番号：
          <span>090-5731-6203</span>
        </ExternalLink>
        <p className={styles.bottomAnnounce}>ホールスタッフも同時募集中です</p>
        <nav>
          <ExternalLink
            className={styles.linkWeb}
            href="https://chocolat.work/kumamoto/a_1031/shop/101884/"
          >
            <span>詳しくはこちら</span>
          </ExternalLink>
          <ExternalLink
            className={styles.linkLine}
            href="https://line.me/ti/p/q49O65UZ3_#~"
          >
            <span>LINE問い合わせ</span>
          </ExternalLink>
        </nav>
      </article>
    </section>
  );
}
