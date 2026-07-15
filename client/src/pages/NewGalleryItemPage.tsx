import { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import Section from '../components/Section/Section';
import { useAuth } from '../context/AuthContext';
import styles from './admin/NewPostPage.module.css';
const NewGalleryItemPage = () => {
  const [src, setSrc] = useState('');
  const [alt, setAlt] = useState('');
  const [caption, setCaption] = useState('');
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!src || !caption) {
      setError('URL da Imagem e Legenda são obrigatórios.');
      setLoading(false);
      return;
    }

    try {
      await addDoc(collection(db, 'gallery'), {
        src,
        alt,
        caption,
        createdAt: serverTimestamp(),
      });
      navigate('/galeria');
    } catch (err) {
      setError('Falha ao adicionar a foto. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section title="Adicionar Foto à Galeria" subtitle="Preencha os campos para adicionar uma nova foto.">
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          URL da Imagem (ex: /img/minha-foto.jpg)
          <input type="text" value={src} onChange={(e) => setSrc(e.target.value)} required />
        </label>
        <label>
          Texto Alternativo (para acessibilidade)
          <input type="text" value={alt} onChange={(e) => setAlt(e.target.value)} />
        </label>
        <label>
          Legenda
          <textarea value={caption} onChange={(e) => setCaption(e.target.value)} rows={3} required />
        </label>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" disabled={loading}>{loading ? 'Adicionando...' : 'Adicionar Foto'}</button>
      </form>
    </Section>
  );
};

export default NewGalleryItemPage;