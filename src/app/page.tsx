import Image from 'next/image';
import Link from 'next/link';
import { en } from '@/lib/i18n/en';
import { siteConfig } from '@/lib/site-config';
import { featuredProjectsEn } from '@/lib/data/projects';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <div className={styles.screen}>
      <section aria-labelledby="hero-name">
        <div className={styles.hero}>
          <Image
            src={siteConfig.heroPhoto}
            alt={siteConfig.author}
            width={96}
            height={96}
            priority
            className={styles.photo}
          />
          <div className={styles.intro}>
            <h1 id="hero-name" className={styles.name}>
              {siteConfig.author}
            </h1>
            <p className={styles.role}>
              {en.home.role} ·{' '}
              <a
                href={siteConfig.employer.url}
                target="_blank"
                rel="noopener"
                className={styles.employer}
              >
                {siteConfig.employer.name}
              </a>
            </p>
            <p className={styles.bio}>{en.home.bio}</p>
          </div>
        </div>

        <p className={styles.availability}>
          <span aria-hidden="true" className={styles.availabilityDot} />
          <span>{en.home.availability}</span>
        </p>

        <div className={styles.actions}>
          <a
            href={siteConfig.resumePdf}
            download={siteConfig.resumeFileName}
            className={styles.primaryAction}
          >
            {en.home.downloadResume} ↓
          </a>
          <Link href="/contact" className={styles.secondaryAction}>
            {en.home.contactMe}
          </Link>
          <div className={styles.profiles}>
            <a href={siteConfig.github} target="_blank" rel="noopener" className={styles.profile}>
              GitHub ↗
            </a>
            <a href={siteConfig.linkedin} target="_blank" rel="noopener" className={styles.profile}>
              LinkedIn ↗
            </a>
          </div>
        </div>
      </section>

      <section aria-labelledby="selected-work" className={styles.selectedWork}>
        <div className={styles.sectionHead}>
          <h2 id="selected-work" className={styles.sectionTitle}>
            {en.home.selectedWork}
          </h2>
          <Link href="/projects" className={styles.viewAll}>
            {en.home.viewAll} →
          </Link>
        </div>
        <div className={styles.cards}>
          {featuredProjectsEn.map((project) => (
            <Link key={project.slug} href="/projects" className={styles.card}>
              <span className={styles.cardName}>{project.name}</span>
              <span className={styles.cardDesc}>{project.desc}</span>
              <span className={styles.cardTech}>{project.tech.join(' · ')}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
