import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';

export const deleteNewsArticle = async (id: string) => {
  if (!id) {
    throw new Error('ID da notícia é inválido para exclusão.');
  }
  const newsDocRef = doc(db, 'news', id);
  await deleteDoc(newsDocRef);
};