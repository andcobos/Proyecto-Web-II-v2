// src/App.jsx
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

// Import your providers
import {FirebaseContext, FirebaseProvider} from "./context/FirebaseContext";
import { EmployeesProvider } from "./context/employeesContext";
import { OffersProvider } from "./context/offersContext";

// Import componentes basicos para la navegacion
import ClientNavbar from "./components/ClientNavbar.jsx";
import CompanyAdminNavbar from "./components/CompanyAdminNavbar";
import AdminNavbar from "./components/AdminNavbar";

//Import paginas Cliente
import Home from "./pages/cliente/Home";
import Ofertas from "./pages/cliente/Oferta";
import MisCupones from "./pages/cliente/MisCupones";
import ComoFunciona from "./pages/cliente/ComoFunciona";

//import paginas Empresa
import AdminLayout from "./pages/empresa/AdminLayout";
import LandingPage from "./pages/empresa/LandingPage";
import CreateEmployee from "./pages/empresa/CreateEmployee";
import EmployeesPage from "./pages/empresa/EmployessPage";
import OffersPage from "./pages/empresa/OffersPage";
import CanjearCupones from "./pages/empresa/CanjearCupones";
import CreateOffer from "./pages/empresa/CreateOffer";

//import pages Admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import Clientes from "./pages/admin/Clientes";
import Empresas from "./pages/admin/Empresas";
import Rubros from "./pages/admin/Rubros";

//Import Login
import Login from "./components/Login";
import Register from "./components/register";
import {useContext, useEffect, useState} from "react";
import authService from "./services/authService.jsx";
import {AdminProvider} from "./context/AdminContext.jsx";


//import autenticacion
function RequireAuth({ children, userType }) {
    const { user, loading } = useContext(FirebaseContext);
    const [userRole, setUserRole] = useState(null);
    const [roleLoading, setRoleLoading] = useState(true);

    useEffect(() => {
        const verifyRole = async () => {
            if (user) {
                try {
                    const role = await authService.getUserRole(user.uid);
                    setUserRole(role);
                } catch (error) {
                    console.error("Error verifying role:", error);
                    setUserRole(null);
                }
            }
            setRoleLoading(false);
        };

        verifyRole();
    }, [user]);

    if (loading || roleLoading) {
        return <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (userRole !== userType) {
        // Redirect based on actual role
        switch (userRole) {
            case 'admin':
                return <Navigate to="/admin" replace />;
            case 'empresa':
                return <Navigate to="/empresa" replace />;
            case 'employee':
                return <Navigate to="/empresa/canjear-cupones" replace />;
            case 'client':
            default:
                return <Navigate to="/" replace />;
        }
    }

    return children;
}

function App() {
    return (
        <FirebaseProvider>
            <EmployeesProvider>
                <OffersProvider>
                    <Router>
                        <Routes>
                            {/* Client Routes */}
                            <Route path="/" element={<ClientNavbar />}>
                                <Route index element={<Home />} />
                                <Route path="ofertas" element={<Ofertas />} />
                                <Route path="login" element={<Login />} />
                                <Route path="register" element={<Register />} />
                                <Route path="como-funciona" element={<ComoFunciona />} />
                                <Route
                                    path="mis-cupones"
                                    element={
                                        <RequireAuth userType="client">
                                            <MisCupones />
                                        </RequireAuth>
                                    }
                                />
                            </Route>

                            {/* Company Routes */}
                            <Route
                                path="/empresa/*"
                                element={
                                    <RequireAuth userType="empresa">
                                        <Routes>
                                            <Route
                                                element={
                                                    <>
                                                        <CompanyAdminNavbar />
                                                        <div className="container mx-auto p-4">
                                                        </div>
                                                    </>
                                                }
                                            >
                                                <Route index element={<AdminLayout />} />
                                                <Route path="landing-page" element={<LandingPage />} />
                                                <Route path="crear-oferta" element={<CreateOffer />} />
                                                <Route path="crear-empleado" element={<CreateEmployee />} />
                                                <Route path="empleados" element={<EmployeesPage />} />
                                                <Route path="ofertas" element={<OffersPage />} />
                                            </Route>
                                        </Routes>
                                    </RequireAuth>
                                }
                            />

                            {/* Employee Route */}
                            <Route
                                path="/empresa/canjear-cupones"
                                element={
                                    <RequireAuth userType="employee">
                                        <div className="container mx-auto p-4">
                                            <CanjearCupones />
                                        </div>
                                    </RequireAuth>
                                }
                            />

                            {/* Admin Routes */}
                            <Route
                                path="/admin/*"  // Changed from "/admin" to "/admin/*"
                                element={
                                    <RequireAuth userType="admin">
                                        <AdminProvider>
                                            <AdminNavbar/>
                                            <div className="container mx-auto p-4">
                                                <Routes>
                                                    <Route index element={<AdminDashboard />} />
                                                    <Route path="clientes" element={<Clientes />} />
                                                    <Route path="empresas" element={<Empresas />} />
                                                    <Route path="rubros" element={<Rubros />} />
                                                </Routes>
                                            </div>
                                        </AdminProvider>
                                    </RequireAuth>
                                }
                            />

                            {/* Catch all route for 404 */}
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </Router>
                </OffersProvider>
            </EmployeesProvider>
        </FirebaseProvider>
    );
}

export default App;