import Section from '../components/Section/Section';
import styles from './ContactPage.module.css';

const ContactPage = () => {
  return (
    <Section title="Contato" subtitle="Fale com a associação e participe das ações da comunidade.">
      <div className={styles.content}>
        <div className={styles.infoCard}>
          <p><strong>Endereço:</strong> Estrada Da Querência, 2390 - Alumínio, São Paulo, CEP 18.125-000</p>
        </div>
        <div className={styles.infoCard}>
          <p><strong>Telefone/WhatsApp:</strong> (15) 99155-4400</p>
        </div>
        <form className={styles.form}>
          <label className={styles.label}>
            Nome
            <input className={styles.input} type="text" placeholder="Seu nome" />
          </label>
          <label className={styles.label}>
            E-mail
            <input className={styles.input} type="email" placeholder="seu@email.com" />
          </label>
          <label className={styles.label}>
            Mensagem
            <textarea className={styles.textarea} placeholder="Escreva sua mensagem" />
          </label>
          <button type="button" className={styles.button}>Enviar mensagem</button>
        </form>
        <a href="https://wa.me/5515991554400" className={styles.whatsappButton} target="_blank" rel="noreferrer">
          <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
            <path d="M16.2 4A12.2 12.2 0 0 0 4 16.2a12.2 12.2 0 0 0 12.2 12.2c1.7 0 3.3-.3 4.8-1l3.5.9-1-3.4a12.2 12.2 0 0 0 2.7-7.7A12.2 12.2 0 0 0 16.2 4zm6.4 14.5c-.3.4-1.2.8-1.7.8-1.2 0-2.4-1.2-2.6-1.3-.3-.1-1.8-1-1.8-1.8s-.4-1.1.2-1.8c.4-.5.9-.7 1.1-.7.2 0 .4 0 .6.3.2.3.6.7.6.8.1.1 0 .2-.1.4l-.4.9-.6.7c-.1.2-.3.3-.4.3-.1 0-.2 0-.3-.1l-1.3-.7c-.8-.5-1.5-1.1-1.8-1.6-.3-.5-.1-1.2.2-.3.4-.4.6-.4.2 0 .3.1.5.2l.4.3s.5.6.5.6c.3.4.4.5.6.8.2.3.3.4.1.7-.2.3-.6.7-1 1.2s-1.1.9-1.6.9c-.4 0-.8-.1-1.1-.3l-1.8-1c-.9-.5-1.7-1.2-2.3-2.1-.6-.9-.9-1.9-.9-3 0-1.9.7-3.5 2-4.8 1.3-1.3 3-2.1 4.8-2.1 2.3 0 4.4 1 5.9 2.5 1.5 1.5 2.5 3.5 2.5 5.9 0 2.2-1 4.3-2.6 5.8z" />
          </svg>
          Entre em contato pelo WhatsApp
        </a>
      </div>
    </Section>
  );
};

export default ContactPage;
