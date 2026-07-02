import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { API_BASE_URL } from '../config';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const loginWithGoogle = async () => {
    if (!auth) {
      throw new Error('Login is not configured yet. Please add Firebase environment variables.');
    }
    try {
      const result = await signInWithPopup(auth, googleProvider);
      
      // Sync with backend
      try {
        await fetch(`${API_BASE_URL}/api/users/sync`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            uid: result.user.uid,
            name: result.user.displayName || '',
            email: result.user.email || '',
            photoURL: result.user.photoURL || '',
            provider: 'google'
          })
        });
      } catch (syncError) {
        console.error('Failed to sync user with backend:', syncError);
      }

      return result.user;
    } catch (error) {
      console.error('Google sign-in error:', error);
      throw new Error('Google sign-in failed. Please try again.');
    }
  };

  const logout = async () => {
    if (!auth) return;
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value = {
    user,
    loading,
    loginWithGoogle,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
