import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Section from '../components/Section/Section';
import styles from './NewsArticlePage.module.css';
import { useAuth } from '../context/AuthContext';
import { deleteNewsArticle } from '../components/NewsCard/news.service';

interface News {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  body: string;
  createdAt: {
    seconds: number;
  };
}

const NewsArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!article) return;
    if (window.confirm(`Tem certeza que deseja excluir a notícia "${article.title}"? Esta ação não pode ser desfeita.`)) {
      try {
        await deleteNewsArticle(article.id);
        alert('Notícia excluída com sucesso.');
        navigate('/noticias');
      } catch (error) {
        console.error('Erro ao excluir notícia:', error);
        alert('Não foi possível excluir a notícia. Tente novamente.');
      }
    }
  };

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;
      try {
        const docRef = doc(db, 'news', slug);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setArticle({ id: docSnap.id, ...docSnap.data() } as News);
        } else {
          console.log("Nenhum documento encontrado!");
        }
      } catch (error) {
        console.error("Erro ao buscar artigo:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <Section title="Carregando...">
        <p>Buscando informações da notícia...</p>
      </Section>
    );
  }

  if (!article) {
    return (
      <Section title="Notícia não encontrada" subtitle="O link que você seguiu pode estar quebrado ou a notícia foi removida.">
        <Link to="/noticias" className={styles.backLink}>&larr; Voltar para todas as notícias</Link>
      </Section>
    );
  }

  return (
    <Section title={article.title} subtitle={`Publicado em ${new Date(article.createdAt.seconds * 1000).toLocaleDateString('pt-BR')}`}>
      {currentUser && (
        <div className={styles.adminActions}>
          <Link to={`/admin/editar-noticia/${article.id}`} className={styles.editButton}>
            Editar Notícia
          </Link>
          <button onClick={handleDelete} className={styles.deleteButton}>Excluir Notícia</button>
        </div>
      )}
      <div className={styles.content}>
        <p>{article.body}</p>
        <Link to="/noticias" className={styles.backLink}>&larr; Voltar para todas as notícias</Link>
      </div>
    </Section>
  );
};

export default NewsArticlePage;
