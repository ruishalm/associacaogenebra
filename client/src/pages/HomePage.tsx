import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';
import NewsCard from '../components/NewsCard/NewsCard';
import Section from '../components/Section/Section';
import styles from './HomePage.module.css';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  body: string;
  isPinned: boolean;
}

const HomePage = () => {
  const [pinnedNews, setPinnedNews] = useState<NewsItem | null>(null);
  const [recentNews, setRecentNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const newsCollection = collection(db, 'news');

        // Busca a notícia fixada
        const pinnedQuery = query(newsCollection, where('isPinned', '==', true), limit(1));
        const pinnedSnapshot = await getDocs(pinnedQuery);
        if (!pinnedSnapshot.empty) {
          setPinnedNews({ id: pinnedSnapshot.docs[0].id, ...pinnedSnapshot.docs[0].data() } as NewsItem);
        }

        // Busca as 4 notícias mais recentes (que não estão fixadas)
        const recentQuery = query(newsCollection, where('isPinned', '==', false), orderBy('createdAt', 'desc'), limit(4));
        const recentSnapshot = await getDocs(recentQuery);
        const newsList = recentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as NewsItem));
        setRecentNews(newsList);

      } catch (error) {
        console.error("Erro ao buscar notícias da home:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className={styles.homePage}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroTextBlock}>
            <p className={styles.heroEyebrow}>Associação de Moradores</p>
            <h1>Associação de moradores do bairro Genebra</h1>
            <p className={styles.heroSubtitle}>Alumínio e Sorocaba</p>
            <p className={styles.highlightTextHero}>Juntos somos mais fortes.</p>
            <div className={styles.heroActions}>
              <Link to="/sobre" className={styles.primaryButton}>Conheça a associação</Link>
              <Link to="/noticias" className={styles.secondaryButton}>Ver notícias</Link>
            </div>
          </div>
          <div className={styles.heroBadge}>
            <span>Comunidade</span>
            <strong>Participação</strong>
          </div>
        </div>
      </section>

      <Section variant="highlight" title="Sobre Nós" subtitle="Representamos os interesses da comunidade com transparência e participação.">
        <p className={styles.sectionText}>
          A Associação de Moradores do Bairro Genebra é o elo que une a comunidade na divisa entre Alumínio e Sorocaba.
          Somos uma organização sem fins lucrativos, formada por vizinhos e para os vizinhos, com o propósito de lutar por um bairro melhor.
          Atuamos de forma transparente na representação dos interesses dos moradores junto aos poderes públicos de ambas as cidades,
          cobrando melhorias em infraestrutura, segurança, saneamento, lazer e cultura.
        </p>
      </Section>

      {!loading && pinnedNews && (
        <Section title="Destaque da Semana" subtitle="Principais iniciativas e ações que movimentam o bairro.">
          <div className={styles.highlightCard}>
            <img src={pinnedNews.imageUrl} alt={pinnedNews.title} className={styles.highlightImage} />
            <div className={styles.highlightText}>
              <h3>{pinnedNews.title}</h3>
              <p>{pinnedNews.description}</p>
              <div className={styles.highlightActions}>
                <Link to={`/noticias/${pinnedNews.id}`} className={styles.highlightLink}>Leia mais</Link>
              </div>
            </div>
          </div>
        </Section>
      )}

      <Section title="Notícias Recentes" subtitle="Os principais assuntos que movimentam o bairro e a associação.">
        <div className={styles.cardsGrid}>
          {loading && <p>Carregando...</p>}
          {!loading && recentNews.length === 0 && <p>Nenhuma notícia recente encontrada.</p>}
          {!loading && recentNews.map((item) => (
            <NewsCard
              key={item.id}
              title={item.title}
              description={item.description}
              image={item.imageUrl}
              alt={item.title}
              link={`/noticias/${item.id}`}
            />
          ))}
        </div>
      </Section>
    </div>
  );
};

export default HomePage;
