import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthModal from '../components/AuthModal/AuthModal';
import Section from '../components/Section/Section';
import { useAuth } from '../context/AuthContext';
import styles from './AdminLoginPage.module.css';
 
 const AdminLoginPage = () => {
   const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentUser, logout } = useAuth();
 
   const openModal = () => setIsModalOpen(true);
   const closeModal = () => setIsModalOpen(false);
 
   return (
     <>
       {currentUser ? (
         <Section title={`Bem-vindo, ${currentUser.displayName || 'Admin'}`} subtitle="Gerencie o conteúdo do site.">
           <div className={styles.adminPanel}>
             <Link to="/admin/postar-noticia" className={styles.adminButton}>
               Postar Nova Notícia
             </Link>
             <button onClick={logout} className={`${styles.adminButton} ${styles.logoutButton}`}>
               Sair (Logout)
             </button>
           </div>
         </Section>
       ) : (
         <Section title="Painel Administrativo" subtitle="Acesso restrito para gerenciamento do site.">
           <div className={styles.container}>
             <button onClick={openModal} className={styles.loginButton}>Acessar Painel</button>
           </div>
           <AuthModal isOpen={isModalOpen} onClose={closeModal} />
         </Section>
       )}
     </>
   );
 };
 
 export default AdminLoginPage;
