import styles from './screen-stub.module.css';

/**
 * Placeholder body for screens whose own ticket has not landed yet. It exists so
 * that every link the header and Home screen expose already resolves; each
 * screen replaces it wholesale when its ticket is implemented.
 */
export function ScreenStub({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className={styles.screen}>
      <h1 className={styles.title}>{title}</h1>
      {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
    </div>
  );
}
