import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import authService from '../services/authService';

export const FirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    const role = await authService.getUserRole(firebaseUser.uid);
                    setUser({
                        uid: firebaseUser.uid,
                        email: firebaseUser.email,
                        role: role
                    });
                } catch (error) {
                    console.error("Error setting user role:", error);
                    setUser(null);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <FirebaseContext.Provider value={{ user, setUser, loading }}>
            {children}
        </FirebaseContext.Provider>
    );
};