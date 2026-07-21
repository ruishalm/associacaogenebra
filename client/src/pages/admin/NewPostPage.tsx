import { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import Section from '../../components/Section/Section';
import { useAuth } from '../../context/AuthContext';
import styles from './NewPostPage.module.css';
import { uploadImage } from '../../services/storage.service';

const NewPostPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [body, setBody] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isPinned, setIsPinned] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !currentUser) {
      navigate('/admin');
    }
  }, [currentUser, authLoading, navigate]);

  if (authLoading || !currentUser) {
    return (
      <Section title="Carregando..." subtitle="Verificando autenticação...">
        <p>Aguarde um momento...</p>
      </Section>
    );
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!title || !description || !body) {
      setError('Título, descrição e corpo são obrigatórios.');
      setLoading(false);
      return;
    }

    let finalImageUrl = imageUrl;

    try {
      if (imageFile) {
        finalImageUrl = await uploadImage(imageFile, (progress) => {
          setUploadProgress(progress);
        }, 'news');
      }

      await addDoc(collection(db, 'news'), {
        title,
        description,
        body,
        imageUrl: finalImageUrl,
        isPinned,
        createdAt: serverTimestamp(),
      });
      navigate('/noticias');
    } catch (err) {
      setError('Falha ao publicar a notícia. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section title="Postar Nova Notícia" subtitle="Preencha os campos para criar uma nova publicação.">
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Título
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label>
          Descrição (resumo para os cards)
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
        <label>
          1. Fazer upload de um arquivo
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </label>
        {uploadProgress !== null && uploadProgress < 100 && (
          <div className={styles.progressContainer}>
            <div className={styles.progressBar} style={{ width: `${uploadProgress}%` }} />
          </div>
        )}
        <label>
          2. Ou colar a URL de uma imagem (ex: /img/news/minha-imagem.jpg)
          <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        </label>
        <label>
          Corpo da Notícia
          <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={10} required />
        </label>
        <label className={styles.checkboxLabel}>
          <input type="checkbox" checked={isPinned} onChange={(e) => setIsPinned(e.target.checked)} />
          Fixar no "Destaque da Semana"?
        </label>

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" disabled={loading}>{loading ? 'Publicando...' : 'Publicar Notícia'}</button>
      </form>
    </Section>
  );
};

export default NewPostPage;