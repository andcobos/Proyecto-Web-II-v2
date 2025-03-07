import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

export const authService = {
    // Register a new user
    registerUser: async (email, password, userData) => {
        try {
            // Create authentication record
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Create document in the clients collection (since registration is for clients)
            await setDoc(doc(db, 'clients', user.uid), {
                uid: user.uid,
                email: user.email,
                ...userData,
                createdAt: new Date(),
                lastLogin: new Date(),
                isActive: true
            });

            return user;
        } catch (error) {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    throw new Error('Este correo electrónico ya está registrado');
                case 'auth/invalid-email':
                    throw new Error('El correo electrónico no es válido');
                case 'auth/weak-password':
                    throw new Error('La contraseña debe tener al menos 6 caracteres');
                default:
                    throw error;
            }
        }
    },

    // Login existing user
    login: async (email, password) => {
        try {
            console.log('Attempting login for:', email);
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log('Firebase auth successful for user:', user.uid);

            const role = await authService.getUserRole(user.uid);
            console.log('Retrieved role:', role);

            if (!role) {
                throw new Error('No role found for user');
            }

            // Update last login
            await setDoc(doc(db, 'users', user.uid), {
                lastLogin: new Date()
            }, { merge: true });

            return {
                uid: user.uid,
                email: user.email,
                role: role
            };
        } catch (error) {
            console.error('Login error:', error);
            if (error.message === 'No role found for user') {
                throw new Error('No role found for user');
            }
            switch (error.code) {
                case 'auth/user-not-found':
                    throw new Error('Usuario no encontrado');
                case 'auth/wrong-password':
                    throw new Error('Contraseña incorrecta');
                default:
                    throw error;
            }
        }
    },

    // Get user role by checking all role-based collections
    getUserRole: async (userId) => {
        try {
            console.log('Checking role for user:', userId);

            // Check the users collection where the data actually is
            const userDoc = await getDoc(doc(db, 'users', userId));
            console.log('Checked users collection:', userDoc.exists());

            if (userDoc.exists()) {
                const userData = userDoc.data();
                console.log('Found user data:', userData);
                return userData.role; // This will return 'client', 'admin', etc.
            }

            console.log('No user document found');
            return null;
        } catch (error) {
            console.error("Error verifying user role:", error);
            throw error;
        }
    },

    // Get user data based on their role
    getUserData: async (userId, role) => {
        try {
            const collectionName = getRoleCollection(role);
            if (!collectionName) return null;

            const userDoc = await getDoc(doc(db, collectionName, userId));
            return userDoc.exists() ? { id: userDoc.id, ...userDoc.data() } : null;
        } catch (error) {
            console.error("Error getting user data:", error);
            throw error;
        }
    },

    // Register a company employee (for company admin use)
    registerEmployee: async (email, password, employeeData, companyId) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, 'employees', user.uid), {
                uid: user.uid,
                email: user.email,
                companyId,
                ...employeeData,
                createdAt: new Date(),
                lastLogin: new Date(),
                isActive: true
            });

            return user;
        } catch (error) {
            throw error;
        }
    }
};

// Helper function to get collection name based on role
function getRoleCollection(role) {
    const collections = {
        'admin': 'admins',
        'empresa': 'company_admins',
        'employee': 'employees',
        'client': 'clients'
    };
    return collections[role] || null;
}

export default authService;