import { onAuthStateChanged, User } from 'firebase/auth';
import { useState, useEffect } from 'react';

import { fireAuth } from '@/infrastructure/auth/firebase';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(fireAuth, async (user) => {
      if (user) {
        setUser(user);
        console.log(await user.getIdToken(true))
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return {
      user: null,
      error: null,
      loading: true as const,
    };
  }

  if (!user) {
    return {
      user: null,
      error: "unauthorized",
      loading: false as const,
    };
  }

  return {
    user: user,
    error: null,
    loading: false as const,
  };
};