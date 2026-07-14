import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import NewsCard from '../components/NewsCard/NewsCard';
import Section from '../components/Section/Section';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './NewsPage.module.css';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  isPinned: boolean;
}

const NewsPage = () => {
  const { currentUser } = useAuth();
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const newsCollection = collection(db, 'news');
        const q = query(newsCollection, orderBy('createdAt', 'desc'));
        const newsSnapshot = await getDocs(q);
        const newsList = newsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as NewsItem));
        setNewsItems(newsList);
      } catch (error) {
        console.error("Erro ao buscar notícias:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <Section title="Notícias" subtitle="Acompanhe os principais comunicados e iniciativas da associação.">
      {currentUser && (
        <div className={styles.adminActions}>
          <Link to="/admin/postar-noticia" className={styles.postButton}>
            Postar Nova Notícia
          </Link>
        </div>
      )}
      {loading && <p>Carregando notícias...</p>}
      <div className={styles.grid}>
        {!loading && newsItems.length === 0 && <p>Nenhuma notícia encontrada.</p>}
        {!loading && newsItems.map((item) => (
          <NewsCard key={item.id} title={item.title} description={item.description} image={item.imageUrl} alt={item.title} link={`/noticias/${item.id}`} />
        ))}
      </div>
    </Section>
  );
};

export default NewsPage;
