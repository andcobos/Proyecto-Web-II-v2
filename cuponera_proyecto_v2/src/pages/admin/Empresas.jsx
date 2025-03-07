// Vista de Empresas del Admin

import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";

function Empresas() {
  const { empresas, deleteEmpresa } = useContext(AdminContext);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Gestión de Empresas</h1>

      {/* Empresas */}
      {empresas.map((empresa) => (
        <div key={empresa.id} className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 mb-6">
          <h2 className="bg-slate-600 text-white text-xl font-semibold p-4 rounded-t-lg">
            {empresa.nombre} ({empresa.codigo})
          </h2>
          <div className="p-6">
            <p><strong>Dirección:</strong> {empresa.direccion}</p>
            <p><strong>Contacto:</strong> {empresa.contacto} - {empresa.telefono} - {empresa.correo}</p>
            <p><strong>Rubro:</strong> {empresa.rubro}</p>
          </div>
          <button
            onClick={() => deleteEmpresa(empresa.id)}
            className="bg-red-500 text-white px-4 py-2 rounded mt-4 hover:bg-red-700"
          >
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
}
export default Empresas;