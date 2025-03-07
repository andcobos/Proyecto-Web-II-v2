import { db, auth } from '../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {
    collection,
    getDocs,
    getDoc,
    doc,
    setDoc,
    addDoc,
    updateDoc,
    query,
    where,
    serverTimestamp,
    orderBy
} from 'firebase/firestore';

// Generate company code (3 letters + 3 numbers)
const generateCompanyCode = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const code = Array(3).fill(null).map(() => letters[Math.floor(Math.random() * letters.length)]).join('');
    const numbers = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${code}${numbers}`;
};

export const companyService = {
    // Create company with authentication
    createCompany: async (companyData, password) => {
        try {
            // 1. Create authentication user
            const userCredential = await createUserWithEmailAndPassword(auth, companyData.email, password);
            const user = userCredential.user;

            // 2. Create user role document
            await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                role: 'empresa',
                createdAt: serverTimestamp(),
                lastLogin: serverTimestamp()
            });

            // 3. Create company document
            const companyCode = generateCompanyCode();
            const companyRef = doc(db, 'companies', user.uid);

            const companyToAdd = {
                name: companyData.name,
                companyCode: companyCode,
                address: companyData.address,
                contactName: companyData.contactName,
                phone: companyData.phone,
                email: companyData.email,
                category: companyData.category, // rubro/category
                commissionPercentage: companyData.commissionPercentage,
                uid: user.uid,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            };

            await setDoc(companyRef, companyToAdd);

            return {
                id: user.uid,
                ...companyToAdd
            };
        } catch (error) {
            console.error("Error creating company:", error);
            throw error;
        }
    },

    // Get company by ID
    getCompanyById: async (companyId) => {
        try {
            const companyDoc = doc(db, 'companies', companyId);
            const snapshot = await getDoc(companyDoc);

            if (!snapshot.exists()) {
                throw new Error('Company not found');
            }

            return {
                id: snapshot.id,
                ...snapshot.data()
            };
        } catch (error) {
            console.error("Error getting company:", error);
            throw error;
        }
    },

    // Update company details
    updateCompany: async (companyId, updateData) => {
        try {
            const companyRef = doc(db, 'companies', companyId);
            await updateDoc(companyRef, {
                ...updateData,
                updatedAt: serverTimestamp()
            });

            return await companyService.getCompanyById(companyId);
        } catch (error) {
            console.error("Error updating company:", error);
            throw error;
        }
    },

    // Get all companies (for admin)
    getAllCompanies: async () => {
        try {
            const companiesCollection = collection(db, 'companies');
            const snapshot = await getDocs(companiesCollection);

            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error("Error getting companies:", error);
            throw error;
        }
    },

    // Add employee to company
    addEmployee: async (companyId, employeeData, password) => {
        try {
            // Create auth user for employee
            const userCredential = await createUserWithEmailAndPassword(auth, employeeData.email, password);
            const user = userCredential.user;

            // Create user role document
            await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                role: 'employee',
                createdAt: serverTimestamp(),
                lastLogin: serverTimestamp()
            });

            // Create employee document
            const employeeRef = doc(db, 'employees', user.uid);
            const employeeToAdd = {
                ...employeeData,
                companyId,
                uid: user.uid,
                createdAt: serverTimestamp()
            };

            await setDoc(employeeRef, employeeToAdd);

            return {
                id: user.uid,
                ...employeeToAdd
            };
        } catch (error) {
            console.error("Error adding employee:", error);
            throw error;
        }
    },

    // Get company employees
    getCompanyEmployees: async (companyId) => {
        try {
            const employeesCollection = collection(db, 'employees');
            const q = query(
                employeesCollection,
                where('companyId', '==', companyId)
            );

            const snapshot = await getDocs(q);
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error("Error getting company employees:", error);
            throw error;
        }
    }
};

export default companyService;