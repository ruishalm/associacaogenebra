import styles from './UtilityCard.module.css';

interface UtilityCardProps {
  name: string;
  contact: string;
  details: string;
}

const UtilityCard = ({ name, contact, details }: UtilityCardProps) => {
  return (
    <div className={styles.card}>
      <h5 className={styles.name}>{name}</h5>
      <p className={styles.contact}>📞 {contact}</p>
      <p className={styles.details}>{details}</p>
    </div>
  );
};

export default UtilityCard;