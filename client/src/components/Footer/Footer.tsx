import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; 2026 Associação de Moradores do Bairro Genebra. Todos os direitos reservados.</p>
      <div className={styles.footerPersonalLogo}>
        <span>Site produzido por:</span>
        <a
          href="https://github.com/ruishalm"
          className={styles.logoLink}
          title="Desenvolvido por Rafa Munhoz"
          target="_blank"
          rel="noreferrer"
        >
          Rafa Munhoz
        </a>
      </div>
    </footer>
  );
};

export default Footer;
