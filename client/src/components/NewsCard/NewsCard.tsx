import { Link } from 'react-router-dom';
import styles from './NewsCard.module.css';
import { useAuth } from '../../context/AuthContext';
import defaultLogo from '../../assets/img/cards/LOGOTIPO.png';

interface NewsCardProps {
  title: string;
  description: string;
  image: string;
  alt: string;
  link: string;
  onDelete?: () => void;
}

const NewsCard = ({ title, description, image, alt, link, onDelete }: NewsCardProps) => {
  const { currentUser } = useAuth();
  const imageSrc = image || defaultLogo;

  return (
    <article className={styles.card}>
      <img src={imageSrc} alt={alt} className={styles.image} />
      <div className={styles.content}>
        <h3>{title}</h3>
        <p>{description}</p>
        <div className={styles.actions}>
          <Link to={link} className={styles.link}>
            Leia mais
          </Link>
          {currentUser && onDelete && (
            <button onClick={onDelete} className={styles.deleteButton}>
              Excluir
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
