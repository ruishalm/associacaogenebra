import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

export const uploadImage = (
  file: File,
  onProgress: (progress: number) => void,
  path: string = 'gallery'
): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject('Nenhum arquivo fornecido.');
    }

    const storageRef = ref(storage, `${path}/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress(progress);
      },
      (error) => {
        console.error('Falha no upload:', error);
        reject('Falha no upload da imagem.');
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      }
    );
  });
};