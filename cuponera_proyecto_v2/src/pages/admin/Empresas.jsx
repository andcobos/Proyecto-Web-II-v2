// src/pages/admin/Empresas.jsx
import { useContext, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import AddEmpresaForm from "../../components/AddEmpresaForm";

function Empresas() {
    const { empresas, deleteEmpresa } = useContext(AdminContext);
    const [showAddModal, setShowAddModal] = useState(false);

    const handleAddClick = () => {
        setShowAddModal(true);
    };

    const handleCloseModal = () => {
        setShowAddModal(false);
    };

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Gestión de Empresas</h1>
                <button
                    onClick={handleAddClick}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Agregar Empresa
                </button>
            </div>

            {/* Add Company Modal */}
            {showAddModal && <AddEmpresaForm onClose={handleCloseModal} />}

            {/* Empresas */}
            <div className="grid grid-cols-1 gap-6">
                {empresas.map((empresa) => (
                    <div key={empresa.id} className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
                        <h2 className="bg-slate-600 text-white text-xl font-semibold p-4">
                            {empresa.name} {empresa.companyCode && `(${empresa.companyCode})`}
                        </h2>
                        <div className="p-6">
                            <p className="mb-2"><strong>Dirección:</strong> {empresa.address}</p>
                            <p className="mb-2"><strong>Contacto:</strong> {empresa.contactName}</p>
                            <p className="mb-2"><strong>Teléfono:</strong> {empresa.phone}</p>
                            <p className="mb-2"><strong>Email:</strong> {empresa.email}</p>
                            <p className="mb-2"><strong>Rubro:</strong> {empresa.category}</p>
                            <p className="mb-2"><strong>Comisión:</strong> {empresa.commissionPercentage}%</p>
                        </div>
                        <div className="px-6 pb-4">
                            <button
                                onClick={() => {
                                    if (window.confirm('¿Estás seguro de que deseas eliminar esta empresa?')) {
                                        deleteEmpresa(empresa.id);
                                    }
                                }}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {empresas.length === 0 && (
                <div className="text-center text-gray-500 mt-10">
                    No hay empresas registradas
                </div>
            )}
        </div>
    );
}

export default Empresas;