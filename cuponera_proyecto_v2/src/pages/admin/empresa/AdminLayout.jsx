import React from 'react';
import { Outlet } from 'react-router-dom';
import CompanyAdminNavbar from "../../../components/CompanyAdminNavbar";


const AdminLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            
            <CompanyAdminNavbar />

            {/* Contenido de cada página */}
            <main className="p-6 flex-grow">
                <Outlet /> 
            </main>
        </div>
    );
};

export default AdminLayout;
