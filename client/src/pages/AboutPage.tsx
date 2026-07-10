import { Link } from 'react-router-dom';
import Section from '../components/Section/Section';
import { useAuth } from '../context/AuthContext';
import { auth } from '../firebase';
import styles from './AboutPage.module.css';

const AboutPage = () => {
  const { userProfile, loading, currentUser } = useAuth(); // A função logout virá do AuthContext

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

        {!loading && !currentUser && (
          <div className={`${styles.highlightBox} ${styles.loginBox}`}>
            <p>
              Você é um administrador? <Link to="/admin">Acesse o painel aqui</Link>.
            </p>
          </div>
        )}

        {!loading && userProfile && currentUser && (
          <div className={`${styles.highlightBox} ${styles.profileBox}`}>
            <strong>Perfil do Administrador</strong>
            <ul className={styles.list}>
              <li><strong>Nome:</strong> {userProfile.displayName}</li>
              <li><strong>E-mail:</strong> {userProfile.email}</li>
              <li><strong>Associação:</strong> {userProfile.association}</li>
            </ul>
            <button onClick={() => auth.signOut()} className={styles.logoutButton}>
              Sair
            </button>
          </div>
        )}
      </div>
    </Section>
  );
};

export default AboutPage;
