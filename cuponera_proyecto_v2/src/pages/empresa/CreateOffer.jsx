import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../../context/FirebaseContext';
import { offerService } from '../../services/offerService';

const CreateOffer = ({ onClose }) => {
    const { user } = useContext(FirebaseContext);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [offerData, setOfferData] = useState({
        title: '',
        regularPrice: '',
        offerPrice: '',
        startDate: '',
        endDate: '',
        couponsExpirationDate: '',
        maxCoupons: '',
        description: '',
        otherDetails: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOfferData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (!user?.uid) {
                throw new Error('No se encontró ID de empresa');
            }

            // Validate dates
            const startDate = new Date(offerData.startDate);
            const endDate = new Date(offerData.endDate);
            const expirationDate = new Date(offerData.couponsExpirationDate);

            if (endDate <= startDate) {
                throw new Error('La fecha de fin debe ser posterior a la fecha de inicio');
            }

            if (expirationDate <= endDate) {
                throw new Error('La fecha de expiración de cupones debe ser posterior a la fecha de fin de la oferta');
            }

            await offerService.createOffer(user.uid, offerData);
            alert('Oferta creada exitosamente y enviada para aprobación');
            onClose();
        } catch (error) {
            console.error('Error creating offer:', error);
            setError(error.message || 'Error al crear la oferta');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Crear Nueva Oferta</h2>
                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700"
                >
                    ✕
                </button>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">Título de la Oferta</label>
                        <input
                            type="text"
                            name="title"
                            value={offerData.title}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Precio Regular ($)</label>
                        <input
                            type="number"
                            name="regularPrice"
                            value={offerData.regularPrice}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                            min="0"
                            step="0.01"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Precio de Oferta ($)</label>
                        <input
                            type="number"
                            name="offerPrice"
                            value={offerData.offerPrice}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                            min="0"
                            step="0.01"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Cantidad Límite de Cupones</label>
                        <input
                            type="number"
                            name="maxCoupons"
                            value={offerData.maxCoupons}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            min="1"
                            placeholder="Opcional"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Fecha de Inicio</label>
                        <input
                            type="datetime-local"
                            name="startDate"
                            value={offerData.startDate}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Fecha de Fin</label>
                        <input
                            type="datetime-local"
                            name="endDate"
                            value={offerData.endDate}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Fecha de Expiración de Cupones</label>
                        <input
                            type="datetime-local"
                            name="couponsExpirationDate"
                            value={offerData.couponsExpirationDate}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Descripción</label>
                    <textarea
                        name="description"
                        value={offerData.description}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        rows="4"
                        required
                    ></textarea>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Otros Detalles</label>
                    <textarea
                        name="otherDetails"
                        value={offerData.otherDetails}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        rows="3"
                        placeholder="Opcional"
                    ></textarea>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 border rounded hover:bg-gray-100"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                    >
                        {loading ? 'Creando...' : 'Crear Oferta'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateOffer;