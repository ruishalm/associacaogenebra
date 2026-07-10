import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut, type User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

interface UserProfile {
  displayName: string;
  email: string;
  association: string;
}

interface AuthContextValue {
  currentUser: FirebaseUser | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const buildProfile = (user: FirebaseUser, existingProfile?: Partial<UserProfile>): UserProfile => ({
  displayName: existingProfile?.displayName ?? user.displayName ?? user.email?.split('@')[0] ?? 'Morador',
  email: user.email ?? '',
  association: existingProfile?.association ?? 'Alumínio',
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        const profileRef = doc(db, 'users', user.uid);
        const snapshot = await getDoc(profileRef);

        if (snapshot.exists()) {
          const snapshotData = snapshot.data() as Partial<UserProfile>;
          setUserProfile(buildProfile(user, snapshotData));
        } else {
          const profile = buildProfile(user);
          await setDoc(profileRef, {
            ...profile,
            createdAt: new Date().toISOString(),
          });
          setUserProfile(profile);
        }
      } else {
        setUserProfile(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    await firebaseSignOut(auth);
    setCurrentUser(null);
    setUserProfile(null);
  };

  const value = useMemo<AuthContextValue>(
    () => ({ currentUser, userProfile, loading, signOut }),
    [currentUser, loading, userProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
