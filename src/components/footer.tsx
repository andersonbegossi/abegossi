import { siteConfig } from '@/lib/site-config';
import styles from './footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.copyright}>© 2026 {siteConfig.author}</span>
        <div className={styles.links}>
          <a href={siteConfig.github} target="_blank" rel="noopener" className={styles.link}>
            GitHub
          </a>
          <a href={siteConfig.linkedin} target="_blank" rel="noopener" className={styles.link}>
            LinkedIn
          </a>
          <a href={`mailto:${siteConfig.email}`} className={styles.link}>
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
