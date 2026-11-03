// src/admin/context/AdminAuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db, AdminUser } from '../lib/firebase';

interface AuthContextType {
  currentUser: User | null;
  adminData: AdminUser | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [adminData, setAdminData] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      setCurrentUser(user);
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists() && userDoc.data().isActive) {
            setAdminData(userDoc.data() as AdminUser);
          } else {
            // Unverified or deactivated admin
            setAdminData(null);
            await firebaseSignOut(auth);
          }
        } catch (error) {
          console.error("Error fetching admin role:", error);
          setAdminData(null);
        }
      } else {
        setAdminData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = () => firebaseSignOut(auth);

  return (
    <AdminAuthContext.Provider value={{ currentUser, adminData, loading, logout }}>
      {!loading && children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);