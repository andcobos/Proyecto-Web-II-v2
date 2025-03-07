import { Link, useLocation, Outlet } from 'react-router-dom';

export default function ClientNavbar() {
    const location = useLocation();

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/ofertas', label: 'Ofertas' },
        { path: '/mis-cupones', label: 'Mis Cupones' },
        { path: '/como-funciona', label: 'Cómo Funciona' },
    ];

    return (
        <>
            <nav className="bg-purple-600 text-white py-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center px-4">
                    <Link to="/" className="font-bold text-lg flex items-center space-x-2">
                        <span role="img" aria-label="ticket">🎟</span>
                        <h1>La Cuponera</h1>
                    </Link>

                    <div className="space-x-4 hidden md:flex">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`hover:underline ${location.pathname === link.path ? 'underline font-semibold' : ''}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="space-x-3 flex items-center">
                        <Link to="/perfil" className="hover:underline hidden md:inline">Perfil</Link>
                        <Link
                            to="/login"
                            className="bg-white text-purple-600 px-3 py-1 rounded hover:bg-gray-200 transition"
                        >
                            Login/Register
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Container for child routes */}
            <Outlet />
        </>
    );
}