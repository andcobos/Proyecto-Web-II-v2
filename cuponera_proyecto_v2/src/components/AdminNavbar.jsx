import { Link } from 'react-router-dom';

function AdminNavbar() {
  return (
    <nav className="bg-blue-600 text-white p-6">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">La Cuponera - Admin</h1>
        <div className="flex space-x-4">
          <Link to="/" className="px-4 py-2 rounded transition duration-300 hover:bg-blue-700">
            Inicio
          </Link>
          <Link to="/admin/empresas" className="px-4 py-2 rounded transition duration-300 hover:bg-blue-700">
            Empresas
          </Link>
          <Link to="/admin/rubros" className="px-4 py-2 rounded transition duration-300 hover:bg-blue-700">
            Rubros
          </Link>
          <Link to="/admin/clientes" className="px-4 py-2 rounded transition duration-300 hover:bg-blue-700">
            Clientes
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;