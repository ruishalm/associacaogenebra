import { Link } from 'react-router-dom';
import Section from '../components/Section/Section';
import styles from './AboutPage.module.css';
import { useAuth } from '../context/AuthContext';

const AboutPage = () => {
  const { currentUser, userProfile, signOut } = useAuth();

  return (
    <Section title="Sobre Nós" subtitle="A associação que representa e fortalece a comunidade do bairro Genebra.">
      <div className={styles.content}>
        <p>
          A Associação de Moradores do Bairro Genebra é uma organização dedicada a promover o bem-estar e o desenvolvimento da nossa comunidade,
          localizada na divisa dos municípios de Alumínio e Sorocaba. Nosso bairro é formado por residências, chácaras e áreas rurais, além de importantes áreas de preservação ambiental.
        </p>
        <p>
          Trabalhamos para unir os moradores e buscar melhorias em infraestrutura, segurança, saneamento, educação, cultura e lazer.
          Acreditamos que, com a participação ativa de todos, é possível construir um ambiente mais próspero e acolhedor para viver.
        </p>
        <div className={styles.highlightBox}>
          <strong>Nossos princípios:</strong>
          <ul className={styles.list}>
            <li>Representação justa dos moradores.</li>
            <li>Diálogo com as prefeituras e entidades parceiras.</li>
            <li>Defesa do bairro e do meio ambiente.</li>
            <li>Fortalecimento da vida comunitária.</li>
          </ul>
        </div>
        <p>
          Nossos projetos e iniciativas são pautados pela colaboração e pelo diálogo. Convidamos todos os moradores a se juntarem a nós,
          porque juntos somos mais fortes.
        </p>

        {currentUser && userProfile ? (
          <div className={`${styles.highlightBox} ${styles.profileBox}`}>
            <p><strong>Logado como:</strong> {userProfile.displayName}</p>
            <p><strong>E-mail:</strong> {userProfile.email}</p>
            <div className={styles.profileActions}>
              <Link to="/admin" className={styles.adminButton}>Acessar Painel</Link>
              <button onClick={signOut} className={`${styles.adminButton} ${styles.logoutButton}`}>Sair</button>
            </div>
          </div>
        ) : (
          <div className={`${styles.highlightBox} ${styles.loginBox}`}>
            <p>Você é um administrador?</p>
            <Link to="/admin" className={styles.adminButton}>Acessar Painel</Link>
          </div>
        )}
      </div>
    </Section>
  );
};

export default AboutPage;
