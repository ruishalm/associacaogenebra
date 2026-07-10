import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import styles from './AuthModal.module.css';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [association, setAssociation] = useState('Alumínio');
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (mode === 'signup') {
        if (accessCode !== '0000') {
          setError('Código especial inválido.');
          return;
        }

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const { user } = userCredential;

        // Salva o perfil do usuário no Firestore
        const profileRef = doc(db, 'users', user.uid);
        await setDoc(profileRef, {
          displayName,
          email: user.email,
          association,
          createdAt: new Date().toISOString(),
        });
        setSuccess('Conta criada com sucesso! Você já pode fazer o login.');
        setTimeout(() => {
          onClose();
        }, 3000); // Fecha o modal após 3 segundos
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setSuccess('Login realizado com sucesso.');
      }

      onClose();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Não foi possível concluir a operação.');
      }
    }
  };

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.modal}>
        <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Fechar">
          ×
        </button>
        <div className={styles.header}>
          <h2>{success ? 'Sucesso!' : (mode === 'login' ? 'Login' : 'Criar conta')}</h2>
          {!success && <p>{mode === 'login' ? 'Acesse o painel administrativo.' : 'Crie uma conta com acesso restrito.'}</p>}
        </div>

        {success ? (
          <p className={styles.success}>{success}</p>
        ) : (
          <>
            <form onSubmit={handleSubmit} className={styles.form}>
              <label>
                E-mail
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
              </label>

              <label>
                Senha
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
              </label>

              {mode === 'signup' ? (
                <>
                  <label>
                    Nome Completo
                    <input type="text" value={displayName} onChange={(event) => setDisplayName(event.target.value)} required />
                  </label>
                  <label>
                    Associação
                    <select value={association} onChange={(event) => setAssociation(event.target.value)}>
                      <option value="Alumínio">Alumínio</option>
                      <option value="Sorocaba">Sorocaba</option>
                    </select>
                  </label>
                  <label>
                    Código especial
                    <input type="text" value={accessCode} onChange={(event) => setAccessCode(event.target.value)} required />
                  </label>
                </>
              ) : null}

              {error ? <p className={styles.error}>{error}</p> : null}

              <button type="submit" className={styles.submitButton}>
                {mode === 'login' ? 'Entrar' : 'Criar conta'}
              </button>
            </form>

            <button type="button" className={styles.switchButton} onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
              {mode === 'login' ? 'Criar conta' : 'Já tenho conta'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
