import styles from './ServiceCard.module.css';

interface ServiceCardProps {
  name: string;
  category: string;
  contact: React.ReactNode;
  whatsapp?: string;
  links?: { url: string; text: string }[];
}

const ServiceCard = ({ name, category, contact, whatsapp, links }: ServiceCardProps) => {
  const whatsappLink = whatsapp ? `https://wa.me/55${whatsapp.replace(/\D/g, '')}` : '#';

  return (
    <div className={styles.card}>
      <span className={styles.category}>{category}</span>
      <h4 className={styles.name}>{name}</h4>
      <p className={styles.contact}>{contact}</p>
      {whatsapp && (
        <a href={whatsappLink} className={styles.whatsappButton} target="_blank" rel="noopener noreferrer">
          WhatsApp
        </a>
      )}
      {links && links.map(link => (
        <a key={link.url} href={link.url} className={styles.linkButton} target="_blank" rel="noopener noreferrer">
          {link.text}
        </a>
      ))}
    </div>
  );
};

export default ServiceCard;