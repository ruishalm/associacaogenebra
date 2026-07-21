import { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import Section from '../components/Section/Section'; // Corrigindo o caminho
import { useAuth } from '../context/AuthContext';
import styles from './admin/NewPostPage.module.css'; // Corrigindo o caminho
import { uploadImage } from '../services/storage.service';

const NewGalleryItemPage = () => {
  const [src, setSrc] = useState('');
  const [alt, setAlt] = useState('');
  const [caption, setCaption] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
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

    if ((!src && !imageFile) || !caption) {
      setError('Você precisa fornecer uma imagem (via upload ou URL) e uma legenda.');
      setLoading(false);
      return;
    }

    let finalImageUrl = src;

    try {
      if (imageFile) {
        finalImageUrl = await uploadImage(imageFile, (progress) => {
          setUploadProgress(progress);
        }, 'gallery');
      }

      await addDoc(collection(db, 'gallery'), {
        src: finalImageUrl,
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
        <p>Escolha <b>uma</b> das opções abaixo para a imagem:</p>
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
          2. Ou colar a URL de uma imagem (ex: /img/minha-foto.jpg)
          <input type="text" value={src} onChange={(e) => setSrc(e.target.value)} />
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