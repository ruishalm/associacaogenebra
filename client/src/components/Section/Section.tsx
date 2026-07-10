import type { ReactNode } from 'react';
import styles from './Section.module.css';

interface SectionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  id?: string;
  variant?: 'default' | 'highlight';
}

const Section = ({ title, subtitle, children, id, variant = 'default' }: SectionProps) => {
  return (
    <section id={id} className={`${styles.section} ${variant === 'highlight' ? styles.highlight : ''}`.trim()}>
      <div className={styles.sectionHeading}>
        <h2>{title}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
};

export default Section;
