import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, orderBy, query, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import Section from '../components/Section/Section';
import styles from './GalleryPage.module.css';

interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
}

const GalleryPage = () => {
  const { currentUser } = useAuth();
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGalleryItems = async () => {
    try {
      const galleryCollection = collection(db, 'gallery');
      const q = query(galleryCollection, orderBy('createdAt', 'desc'));
      const gallerySnapshot = await getDocs(q);
      const itemsList = gallerySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as GalleryItem));
      setGalleryItems(itemsList);
    } catch (error) {
      console.error("Erro ao buscar itens da galeria:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta foto?')) {
      try {
        await deleteDoc(doc(db, 'gallery', id));
        fetchGalleryItems(); // Recarrega os itens
      } catch (error) {
        console.error('Erro ao excluir foto:', error);
        alert('Não foi possível excluir a foto.');
      }
    }
  };

  return (
    <Section title="Galeria" subtitle="Confira registros da comunidade, dos eventos e do cotidiano do bairro.">
      {currentUser && (
        <div className={styles.adminActions}>
          <Link to="/admin/postar-foto" className={styles.postButton}>Postar Nova Foto</Link>
        </div>
      )}
      <div className={styles.grid}>
        {loading && <p>Carregando galeria...</p>}
        {galleryItems.map((item) => (
          <div className={styles.card} key={item.id}>
            <img className={styles.image} src={item.src} alt={item.alt} />
            <p className={styles.caption}>{item.caption}</p>
            {currentUser && (
              <button onClick={() => handleDelete(item.id)} className={styles.deleteButton} title="Excluir foto">
                &times;
              </button>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
};

export default GalleryPage;
