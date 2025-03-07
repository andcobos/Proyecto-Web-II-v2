// src/pages/admin/AdminDashboard.jsx
import React, { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';

function AdminDashboard() {
  const { empresas, rubros, clientes } = useContext(AdminContext);

  // Add loading state check
  if (!empresas || !rubros || !clientes) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>;
  }

  return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard Administrativo</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Empresas</h2>
            <p className="text-3xl">{empresas.length}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Rubros</h2>
            <p className="text-3xl">{rubros.length}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Clientes</h2>
            <p className="text-3xl">{clientes.length}</p>
          </div>
        </div>
      </div>
  );
}

export default AdminDashboard;