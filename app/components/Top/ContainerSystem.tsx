/* =======================================
 * クラブ智 料金システム
 * URL:src/components/Top/ContainerSystem.tsx
 * Referenced in: : /app/page.tsx
 * Created: 2026-03-25
 * Last updated: 2026-03-25
 * ======================================= */

import styles from '@/styles/PageTop.module.scss';

export default function ContainerSystem() {
  return (
    <section className={styles.containerSystem} id="ContainerSystem">
      <article>
        <h2>system</h2>
        <div className={styles.boxMainMenu}>
          <dl>
            <div>
              <dt>
                <em>1SET[60min]</em>
              </dt>
              <dd>
                <em>7,000円</em>
              </dd>
            </div>
            <br />
            <div>
              <dt>ご延長　[60分]</dt>
              <dd>7,000円</dd>
            </div>
            <div>
              <dt>[30分]</dt>
              <dd>3,500円</dd>
            </div>
            <br />
            <div>
              <dt>ご指名</dt>
              <dd>1,000円</dd>
            </div>
            <div>
              <dt>同伴料</dt>
              <dd>2,000円</dd>
            </div>
            <div>
              <dt>シングルチャージ</dt>
              <dd>2,000円</dd>
            </div>
          </dl>
          <div className={styles.itemTax}>サービス料15％・TAX10％</div>
          <h3>※キープボトルについて</h3>
          <p>
            ボトル保管は１年とさせていただきます。ご了承の程よろしくお願い申し上げます。
          </p>
        </div>
        <div className={styles.boxFreeDrink}>
          <h3>free drink</h3>
          <span>
            ウィスキー ・ ブランデー ・ 焼酎（米・芋・麦）・ レモンサワー
          </span>
          <div className={styles.wrapSoftDrink}>
            <h4>ソフトドリンク</h4>
            <ul>
              <li>緑茶</li>
              <li>ウーロン茶</li>
              <li>オレンジジュース</li>
              <li>コーラ</li>
              <li>ジンジャーエール</li>
              <li>カルピス</li>
            </ul>
          </div>
        </div>
        <div className={styles.boxFoodMenu}>
          <h3>food menu</h3>
          <dl>
            <div>
              <dt>・フルーツ盛り</dt>
              <dd>3,000円〜</dd>
            </div>
            <div>
              <dt>・チーズ盛り</dt>
              <dd>3,000円</dd>
            </div>
            <div>
              <dt>・生ハム盛り</dt>
              <dd>3,000円</dd>
            </div>
            <div>
              <dt>・スナック各種</dt>
              <dd>1,000円</dd>
            </div>
          </dl>
        </div>
      </article>
    </section>
  );
}
