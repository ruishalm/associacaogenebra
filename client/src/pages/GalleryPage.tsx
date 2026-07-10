import Section from '../components/Section/Section';
import styles from './GalleryPage.module.css';

const galleryItems = [
  {
    src: '/img/306147144_420943466856904_1592488920646347259_n.jpg',
    alt: 'Pôr do sol no bairro Genebra',
    caption: 'Registro da beleza do bairro e de seus pontos de encontro.',
  },
  {
    src: '/img/caldo.jpg',
    alt: 'Foto do antigo caldo de cana do bairro',
    caption: 'Memórias do Genebra e de sua identidade cultural.',
  },
];

const GalleryPage = () => {
  return (
    <Section title="Galeria" subtitle="Confira registros da comunidade, dos eventos e do cotidiano do bairro.">
      <div className={styles.grid}>
        {galleryItems.map((item) => (
          <div className={styles.card} key={item.src}>
            <img className={styles.image} src={item.src} alt={item.alt} />
            <p className={styles.caption}>{item.caption}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default GalleryPage;
