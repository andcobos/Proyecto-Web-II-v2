import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CompanyAdminNavbar from "./components/CompanyAdminNavbar";
import AdminLayout from "./pages/admin/empresa/AdminLayout";


function App() {
  return (
    <Router>
      <CompanyAdminNavbar />
      <div className="container mx-auto p-4">
        <Routes>

          <Route path="/admin/empresa/" element={<AdminLayout />} />
          <Route path="/admin/empresa/LandingPage" element={<h1>Landing Page</h1>} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;