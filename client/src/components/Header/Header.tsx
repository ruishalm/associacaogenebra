import { NavLink, Link } from 'react-router-dom';
import styles from './Header.module.css';

const links = [
  { to: '/', label: 'Início' },
  { to: '/sobre', label: 'Sobre Nós' },
  { to: '/noticias', label: 'Notícias' },
  { to: '/contato', label: 'Contato' },
  { to: '/galeria', label: 'Galeria' },
];

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link to="/" className={styles.brandLink} title="Página Inicial">
          <img src="/img/logos/LogoBrancoAluminio.png" alt="Logo da Associação de Alumínio" className={styles.brandLogo} />
          <div className={styles.headerTitleContainer}>
            <div className={styles.titleWrapper}>
              <span className={styles.animationStage} aria-hidden="true">
                <span className={`${styles.animationIcon} ${styles.greenLine} ${styles.line1}`} />
                <span className={`${styles.animationIcon} ${styles.greenLine} ${styles.line2}`} />
                <span className={`${styles.animationIcon} ${styles.greenLine} ${styles.line3}`} />
                <span className={`${styles.animationIcon} ${styles.greenLine} ${styles.line4}`} />
                <span className={`${styles.animationIcon} ${styles.sun}`} />
                <span className={`${styles.animationIcon} ${styles.tree} ${styles.tree1}`} />
                <span className={`${styles.animationIcon} ${styles.tree} ${styles.tree2}`} />
                <span className={`${styles.animationIcon} ${styles.tree} ${styles.tree3}`} />
                <span className={`${styles.animationIcon} ${styles.tree} ${styles.tree4}`} />
                <span className={`${styles.animationIcon} ${styles.tree} ${styles.tree5}`} />
                <span className={`${styles.animationIcon} ${styles.tree} ${styles.tree6}`} />
                <span className={`${styles.animationIcon} ${styles.house} ${styles.house1}`} />
                <span className={`${styles.animationIcon} ${styles.people} ${styles.people1}`} />
                <span className={`${styles.animationIcon} ${styles.house} ${styles.house2}`} />
                <span className={`${styles.animationIcon} ${styles.people} ${styles.people2}`} />
                <span className={`${styles.animationIcon} ${styles.house} ${styles.house3}`} />
                <span className={`${styles.animationIcon} ${styles.people} ${styles.people3}`} />
                <span className={`${styles.animationIcon} ${styles.house} ${styles.house4}`} />
                <span className={`${styles.animationIcon} ${styles.house} ${styles.house5}`} />
                <span className={`${styles.animationIcon} ${styles.house} ${styles.house6}`} />
              </span>
              <h1 className={styles.headerTitleText}>Fazenda Genebra</h1>
            </div>
          </div>
          <img src="/img/logos/LogoBrancoSorocaba.png" alt="Logo da Associação de Sorocaba" className={styles.brandLogo} />
        </Link>
      </div>
      <nav className={styles.nav}>
        <ul>
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }: { isActive: boolean }) => (isActive ? styles.active : '')}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
