import { useContext } from 'react';
import { FirebaseContext } from '../context/FirebaseContext';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut
} from 'firebase/auth';

export function useAuth() {
    const { auth, user } = useContext(FirebaseContext);

    // handle para el login !!!!!11!
    const login = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            return { user: userCredential.user, error: null };
        } catch (error) {
            return { user: null, error: error.message };
        }
    };

    // Registro!!!1 No me cambien el codigo !!!!!!
    const register = async (email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            return { user: userCredential.user, error: null };
        } catch (error) {
            return { user: null, error: error.message };
        }
    };

    // logout
    const logout = async () => {
        try {
            await signOut(auth);
            return { error: null };
        } catch (error) {
            return { error: error.message };
        }
    };

    return {
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user
    };
}