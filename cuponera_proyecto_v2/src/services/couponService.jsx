import { db } from '../firebase/config';
import {
    collection,
    getDocs,
    getDoc,
    doc,
    addDoc,
    query,
    where,
    serverTimestamp
} from 'firebase/firestore';

// Servicio para manejar las operaciones relacionadas con los cupones
export const couponService = {
    // Fetchea todas las ofertas dentro de la colleccion ofertas
    getOffers: async () => {
        try {
            const offersCollection = collection(db, 'offers');
            const snapshot = await getDocs(offersCollection);

            // parsea docs de FB a un array de objetos, creo.
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error("Error al obtener las ofertas:", error);
            throw error;
        }
    },

    // busca oferta por ID y la retorna
    getOfferById: async (offerId) => {
        try {
            const offerDoc = doc(db, 'offers', offerId);
            const snapshot = await getDoc(offerDoc);

            if (!snapshot.exists()) {
                throw new Error('Offer not found');
            }

            return {
                id: snapshot.id,
                ...snapshot.data()
            };
        } catch (error) {
            console.error(`Error al obtener la oferta con ID ${offerId}:`, error);
            throw error;
        }
    },

    // maneja la compra de un cupon por un usuario
    purchaseCoupon: async (offerId, userId) => {
        try {
            // se verifica que la oferta exista y no haya expirado
            const offerDoc = await getDoc(doc(db, 'offers', offerId));
            if (!offerDoc.exists()) {
                throw new Error('Offer not found');
            }

            const offerData = offerDoc.data();
            if (offerData.expirationDate && offerData.expirationDate.toDate() < new Date()) {
                throw new Error('Offer has expired');
            }

            // se crea el registro de compra
            const purchaseCollection = collection(db, 'purchases');
            const purchaseData = {
                offerId,
                userId,
                purchaseDate: serverTimestamp(),
                offerData: {
                    title: offerData.title,
                    price: offerData.price,
                    description: offerData.description,
                    expirationDate: offerData.expirationDate,
                    codigo: offerData.codigo // if this exists in offers
                },
                status: 'available' // or 'redeemed' or 'expired'
            };

            const docRef = await addDoc(purchaseCollection, purchaseData);
            return {
                id: docRef.id,
                ...purchaseData
            };
        } catch (error) {
            console.error("Error al realizar la compra del cupón:", error);
            throw error;
        }
    },

    // retorna los cupones comprados por un usuario
    getUserCoupons: async (userId) => {
        try {
            const purchasesCollection = collection(db, 'purchases');

            // filtro de cupones por usuario
            const userPurchasesQuery = query(
                purchasesCollection,
                where('userId', '==', userId)
            );

            const snapshot = await getDocs(userPurchasesQuery);
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error(`Error al obtener los cupones del usuario con ID ${userId}:`, error);
            throw error;
        }
    }
};

export default couponService;