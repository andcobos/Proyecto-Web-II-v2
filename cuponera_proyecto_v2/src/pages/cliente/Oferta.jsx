import React, { useState, useEffect } from "react";
import OfertaCardOfertas from "../../components/OfertaCardOferta";
import couponService from "../../services/couponService";

export default function Ofertas() {
    const [search, setSearch] = useState("");
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const categorias = ["Salud", "Belleza", "Restaurantes", "Hoteles"];

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const data = await couponService.getOffers();
                setOffers(data);
            } catch (err) {
                setError("Error al cargar las ofertas.");
            } finally {
                setLoading(false);
            }
        };

        fetchOffers();
    }, []);

    const filteredOffers = offers.filter((offer) =>
        offer.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-start mb-6 gap-6">
                <input
                    type="text"
                    placeholder="Buscar ofertas..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-2/3 p-2 border rounded"
                />

                <div className="w-1/3 space-y-2">
                    <h3 className="font-bold text-lg">Categorías</h3>
                    {categorias.map((cat) => (
                        <button
                            key={cat}
                            className="block w-full text-left text-purple-600 hover:underline p-1 rounded"
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <h2 className="text-2xl font-bold mb-4 text-pink-500">Lo mejor del día</h2>

            {loading ? (
                <p className="text-center text-gray-600">Cargando ofertas...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : filteredOffers.length > 0 ? (
                <div className="space-y-4">
                    {filteredOffers.map((offer, index) => (
                        <OfertaCardOfertas key={index} offer={offer} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-600">No se encontraron ofertas.</p>
            )}
        </div>
    );
}
