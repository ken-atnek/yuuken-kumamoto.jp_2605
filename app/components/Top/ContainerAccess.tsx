/* =======================================
 * クラブ智 ACCESS
 * URL:src/components/Top/ContainerAccess.tsx
 * Referenced in: : /app/page.tsx
 * Created: 2026-03-25
 * Last updated: 2026-03-25
 * ======================================= */

import styles from '@/styles/PageTop.module.scss';
import ExternalLink from '@/components/common/ExternalLink';
export default function ContainerAccess() {
  return (
    <section className={styles.containerAccess} id="ContainerAccess">
      <article>
        <h2>access</h2>
        <div className={styles.boxAddress}>
          <address>熊本市中央区新市街４-8 クレストビル新市街３F</address>
          <ExternalLink
            href="https://maps.app.goo.gl/URTCqCiTC1fHAJeS9"
            className={styles.linkMap}
          >
            <span>map</span>
          </ExternalLink>
        </div>
        <div className={styles.boxMap}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1650.9182935563654!2d130.70472831351347!3d32.799284980035395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3540f5a95dd56e6f%3A0xfa6df8b614f69b90!2z44Kv44Op44OWIOaZug!5e0!3m2!1sja!2sjp!4v1774426217869!5m2!1sja!2sjp"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="クラブ智 アクセスマップ"
          />
        </div>
      </article>
    </section>
  );
}
