import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import CompanyAdminNavbar from "../../components/CompanyAdminNavbar.jsx";
import CreateOffer from "./CreateOffer.jsx";

const AdminLayout = () => {
    const [showCreateOffer, setShowCreateOffer] = useState(false);

    const handleOpenModal = () => {
        console.log('Opening modal...');
        setShowCreateOffer(true);
        console.log('showCreateOffer set to:', true);
    };

    const handleCloseModal = () => {
        console.log('Closing modal...');
        setShowCreateOffer(false);
    };

    console.log('Current showCreateOffer state:', showCreateOffer); // Debug render

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <CompanyAdminNavbar />

            {/* Main content area */}
            <main className="p-6 flex-grow">
                <div className="mb-6 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Panel de Empresa</h1>
                    <button
                        onClick={handleOpenModal}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Crear Nueva Oferta
                    </button>
                </div>

                {/* Create Offer Modal */}
                {showCreateOffer && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <CreateOffer onClose={handleCloseModal} />
                    </div>
                )}

                {/* Page content */}
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;