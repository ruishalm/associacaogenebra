import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../firebase';
import Section from '../../components/Section/Section';
import { useAuth } from '../../context/AuthContext';
import styles from './NewPostPage.module.css'; // Reutilizando os estilos
import { uploadImage } from '../../services/storage.service';

interface NewsData {
  title: string;
  description: string;
  body: string;
  imageUrl: string;
  isPinned: boolean;
}

const EditPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [formData, setFormData] = useState<NewsData | null>(null);
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...(prev as NewsData),
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!slug) return;
    if (!formData) return;
    setLoading(true);
    setError('');

    if (!formData.title || !formData.description || !formData.body) {
      setError('Título, descrição e corpo são obrigatórios.');
      setLoading(false);
      return;
    }

    let finalImageUrl = formData.imageUrl;

    try {
      if (imageFile) {
        finalImageUrl = await uploadImage(imageFile, (progress) => {
          setUploadProgress(progress);
        }, 'news');
      }

      const docRef = doc(db, 'news', slug);
      await updateDoc(docRef, {
        ...formData,
        imageUrl: finalImageUrl,
        updatedAt: serverTimestamp()
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

  if (!formData) {
    return (
      <Section title="Erro" subtitle="Não foi possível carregar os dados da notícia.">
        <p>{error}</p>
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
          1. Fazer upload de um novo arquivo (substitui a imagem atual)
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </label>
        {uploadProgress !== null && uploadProgress < 100 && (
          <div className={styles.progressContainer}>
            <div className={styles.progressBar} style={{ width: `${uploadProgress}%` }} />
          </div>
        )}
        <label>
          2. Ou colar a URL de uma imagem
          <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
          <small>Imagem atual: {formData.imageUrl || 'Nenhuma'}</small>
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