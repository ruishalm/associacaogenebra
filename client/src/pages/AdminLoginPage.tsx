import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthModal from '../components/AuthModal/AuthModal';
import Section from '../components/Section/Section';
import styles from './AdminLoginPage.module.css';

const AdminLoginPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Section title="Acesso administrativo" subtitle="Área reservada para os administradores da associação.">
        <div className={styles.card}>
          <p>Use o formulário abaixo para entrar no painel simples de gestão de notícias e conteúdo.</p>
          <button type="button" className={styles.button} onClick={() => setIsModalOpen(true)}>
            Entrar ou criar conta
          </button>
          <Link to="/" className={styles.backLink}>Voltar para o site</Link>
        </div>
      </Section>
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default AdminLoginPage;
