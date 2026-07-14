import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../firebase';
import Section from '../../components/Section/Section';
import { useAuth } from '../../context/AuthContext';
import styles from './NewPostPage.module.css'; // Reutilizando os estilos

interface NewsData {
  title: string;
  description: string;
  body: string;
  imageUrl: string;
  isPinned: boolean;
}

const EditPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [formData, setFormData] = useState<NewsData>({
    title: '',
    description: '',
    body: '',
    imageUrl: '',
    isPinned: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const navigate = useNavigate();
  const { currentUser, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !currentUser) {
      navigate('/admin');
    }
  }, [currentUser, authLoading, navigate]);

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      try {
        const docRef = doc(db, 'news', slug);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setFormData(docSnap.data() as NewsData);
        } else {
          setError('Notícia não encontrada.');
        }
      } catch (err) {
        setError('Falha ao carregar a notícia.');
        console.error(err);
      } finally {
        setPageLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!slug) return;

    setLoading(true);
    setError('');

    if (!formData.title || !formData.description || !formData.body) {
      setError('Título, descrição e corpo são obrigatórios.');
      setLoading(false);
      return;
    }

    try {
      const docRef = doc(db, 'news', slug);
      await updateDoc(docRef, {
        ...formData,
        updatedAt: serverTimestamp(),
      });
      navigate(`/noticias/${slug}`);
    } catch (err) {
      setError('Falha ao atualizar a notícia. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || pageLoading) {
    return (
      <Section title="Carregando..." subtitle="Buscando dados da notícia...">
        <p>Aguarde um momento...</p>
      </Section>
    );
  }

  return (
    <Section title="Editar Notícia" subtitle="Altere os campos e salve as modificações.">
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Título
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </label>
        <label>
          Descrição (resumo para os cards)
          <input type="text" name="description" value={formData.description} onChange={handleChange} required />
        </label>
        <label>
          URL da Imagem (ex: /img/news/minha-imagem.jpg)
          <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
        </label>
        <label>
          Corpo da Notícia
          <textarea name="body" value={formData.body} onChange={handleChange} rows={10} required />
        </label>
        <label className={styles.checkboxLabel}>
          <input type="checkbox" name="isPinned" checked={formData.isPinned} onChange={handleChange} />
          Fixar no "Destaque da Semana"?
        </label>

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" disabled={loading}>{loading ? 'Salvando...' : 'Salvar Alterações'}</button>
      </form>
    </Section>
  );
};

export default EditPostPage;