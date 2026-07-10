import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyBPKt6rmvaWM8437JggBxSnYwmurYLnuK8',
  authDomain: 'associacaogenebra.firebaseapp.com',
  databaseURL: 'https://associacaogenebra-default-rtdb.firebaseio.com',
  projectId: 'associacaogenebra',
  storageBucket: 'associacaogenebra.appspot.com',
  messagingSenderId: '135816242935',
  appId: '1:135816242935:web:09340e805aba87681a55f2',
  measurementId: 'G-S8870NF2ST',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
