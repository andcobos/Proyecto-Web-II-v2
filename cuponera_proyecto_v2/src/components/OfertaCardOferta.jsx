import React from 'react';

const OfertaCardOfertas = ({ offer }) => {
    // Helper function to safely format dates
    const formatDate = (timestamp) => {
        if (!timestamp) return 'N/A';
        // Handle both Firestore Timestamp objects and regular dates
        const date = timestamp?.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Helper to calculate discount percentage
    const calculateDiscount = (regular, offer) => {
        return Math.round(((regular - offer) / regular) * 100);
    };

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">{offer.title}</h3>
                        <p className="text-gray-600 mt-2">{offer.description}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-gray-500 line-through">${offer.regularPrice}</p>
                        <p className="text-2xl font-bold text-pink-500">${offer.offerPrice}</p>
                        <p className="text-green-600">
                            {calculateDiscount(offer.regularPrice, offer.offerPrice)}% OFF
                        </p>
                    </div>
                </div>

                <div className="mt-4 text-sm text-gray-600">
                    <p>Válido desde: {formatDate(offer.startDate)}</p>
                    <p>Válido hasta: {formatDate(offer.endDate)}</p>
                    <p>Fecha límite de uso: {formatDate(offer.expirationDate)}</p>
                </div>

                {offer.limitedQuantity && (
                    <p className="mt-2 text-orange-600">
                        ¡Solo quedan {offer.availableQuantity} cupones!
                    </p>
                )}
            </div>
        </div>
    );
};

export default OfertaCardOfertas;