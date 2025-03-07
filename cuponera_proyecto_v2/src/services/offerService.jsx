import { db } from '../firebase/config';
import {
    collection,
    addDoc,
    updateDoc,
    doc,
    serverTimestamp,
    query,
    where,
    getDocs
} from 'firebase/firestore';

export const offerService = {
    createOffer: async (companyId, offerData) => {
        try {
            const offersCollection = collection(db, 'offers');

            const offerToAdd = {
                companyId,
                title: offerData.title,
                regularPrice: Number(offerData.regularPrice),
                offerPrice: Number(offerData.offerPrice),
                startDate: new Date(offerData.startDate),
                endDate: new Date(offerData.endDate),
                couponsExpirationDate: new Date(offerData.couponsExpirationDate),
                maxCoupons: offerData.maxCoupons ? Number(offerData.maxCoupons) : null,
                description: offerData.description,
                otherDetails: offerData.otherDetails || "",
                createdAt: serverTimestamp(),
                status: "PENDING_APPROVAL", // En espera de aprobación
                rejectionReason: ""
            };

            const docRef = await addDoc(offersCollection, offerToAdd);
            return {
                id: docRef.id,
                ...offerToAdd
            };
        } catch (error) {
            console.error("Error creating offer:", error);
            throw error;
        }
    },

    getCompanyOffers: async (companyId) => {
        try {
            const offersCollection = collection(db, 'offers');
            const q = query(
                offersCollection,
                where('companyId', '==', companyId)
            );

            const snapshot = await getDocs(q);
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error("Error getting company offers:", error);
            throw error;
        }
    },

    updateOfferStatus: async (offerId, status, rejectionReason = "") => {
        try {
            const offerRef = doc(db, 'offers', offerId);
            await updateDoc(offerRef, {
                status,
                rejectionReason,
                updatedAt: serverTimestamp()
            });
        } catch (error) {
            console.error("Error updating offer status:", error);
            throw error;
        }
    }
};

export default offerService;