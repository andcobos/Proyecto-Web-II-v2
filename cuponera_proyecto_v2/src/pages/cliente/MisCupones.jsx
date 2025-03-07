import React, { useState, useEffect } from "react";
import couponService from "../../services/couponService";
import jsPDF from "jspdf";



export default function MisCupones({ userId }) {
    const [cupones, setCupones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("disponibles");

    useEffect(() => {
        const fetchCupones = async () => {
            try {
                const data = await couponService.getUserCoupons(userId);
                setCupones(data);
            } catch (err) {
                setError("Error al cargar los cupones.");
            } finally {
                setLoading(false);
            }
        };

        fetchCupones();
    }, [userId]);

    const generarPDF = (cupon) => {
        const doc = new jsPDF();
        doc.text("Cupón: ${cupon.title}, 10, 20");
        doc.text("Código: ${cupon.codigo}, 10, 30");
        doc.text("Descripción: ${cupon.description}, 10, 40");
        doc.text("Válido hasta: ${cupon.expirationDate}, 10, 50");
        doc.save("Cupon_${cupon.codigo}.pdf");
    };

    const filteredCupones = cupones.filter((cupon) => {
        switch(selectedCategory) {
            case 'disponibles':
                return cupon.status === 'available';
            case 'canjeados':
                return cupon.status === 'redeemed';
            case 'vencidos':
                return cupon.status === 'expired';
            default:
                return false;
        }
    });
    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-center mb-6 text-purple-600">Mis Cupones</h1>

            <div className="flex justify-center space-x-4 mb-6">
                <button
                    // Missing backticks and proper template literal syntax
                    className={`px-4 py-2 rounded ${selectedCategory === "disponibles" ? "bg-purple-600 text-white" : "bg-gray-200"}`}
                    onClick={() => setSelectedCategory("disponibles")}
                >
                    Disponibles
                </button>
                <button
                    // Missing backticks and proper template literal syntax
                    className={`px-4 py-2 rounded ${selectedCategory === "canjeados" ? "bg-purple-600 text-white" : "bg-gray-200"}`}
                    onClick={() => setSelectedCategory("canjeados")}
                >
                    Canjeados
                </button>
                <button
                    // Missing backticks and proper template literal syntax
                    className={`px-4 py-2 rounded ${selectedCategory === "vencidos" ? "bg-purple-600 text-white" : "bg-gray-200"}`}
                    onClick={() => setSelectedCategory("vencidos")}
                >
                    Vencidos
                </button>
            </div>

            {loading ? (
                <p className="text-center text-gray-600">Cargando cupones...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : filteredCupones.length > 0 ? (
                <div className="space-y-4">
                    {filteredCupones.map((cupon) => (
                        <div key={cupon.id} className="border p-4 rounded-lg shadow-md flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold text-lg">{cupon.title}</h3>
                                <p className="text-sm text-gray-600">{cupon.description}</p>
                                <p className="text-sm text-gray-500">Válido hasta: {cupon.expirationDate}</p>
                            </div>
                            {selectedCategory === "disponibles" && (
                                <button
                                    onClick={() => generarPDF(cupon)}
                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                >
                                    Descargar PDF
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-600">No hay cupones en esta categoría.</p>
            )}
        </div>
    );
}