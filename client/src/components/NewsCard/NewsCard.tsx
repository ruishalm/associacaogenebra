import { Link } from 'react-router-dom';
import styles from './NewsCard.module.css';

interface NewsCardProps {
  title: string;
  description: string;
  image: string;
  alt: string;
  link: string;
}

const NewsCard = ({ title, description, image, alt, link }: NewsCardProps) => {
  return (
    <article className={styles.card}>
      <img src={image} alt={alt} className={styles.image} />
      <div className={styles.content}>
        <h3>{title}</h3>
        <p>{description}</p>
        <Link to={link} className={styles.link}>Leia mais</Link>
      </div>
    </article>
  );
};

export default NewsCard;
