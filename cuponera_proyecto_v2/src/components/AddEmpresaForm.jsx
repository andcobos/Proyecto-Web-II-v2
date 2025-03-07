import React, { useState, useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { companyService } from '../services/companyService';

const AddEmpresaForm = ({ onClose }) => {
    const { addEmpresa } = useContext(AdminContext);
    const [formData, setFormData] = useState({
        name: '',           // Changed from nombre
        address: '',        // Changed from direccion
        contactName: '',    // Changed from contacto
        phone: '',         // Changed from telefono
        email: '',         // Changed from correo
        category: '',      // Changed from rubro
        commissionPercentage: '', // Changed from comision
        password: '',      // Added password field
        confirmPassword: '' // Added password confirmation
    });

    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        try {
            const companyData = {
                name: formData.name,
                address: formData.address,
                contactName: formData.contactName,
                phone: formData.phone,
                email: formData.email,
                category: formData.category,
                commissionPercentage: Number(formData.commissionPercentage)
            };

            await companyService.createCompany(companyData, formData.password);
            onClose();
        } catch (error) {
            console.error('Error al crear empresa:', error);
            setError(error.message || 'Error al crear la empresa');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
                <h2 className="text-2xl font-bold mb-4">Crear Nueva Empresa</h2>
                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Nombre de la Empresa</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Dirección</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Nombre del Contacto</label>
                            <input
                                type="text"
                                name="contactName"
                                value={formData.contactName}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Teléfono</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Correo Electrónico</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Rubro</label>
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Comisión (%)</label>
                            <input
                                type="number"
                                name="commissionPercentage"
                                value={formData.commissionPercentage}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                                required
                                min="0"
                                max="100"
                                step="0.01"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Contraseña</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                                required
                                minLength="6"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Confirmar Contraseña</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                                required
                                minLength="6"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded hover:bg-gray-100"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Crear Empresa
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEmpresaForm;