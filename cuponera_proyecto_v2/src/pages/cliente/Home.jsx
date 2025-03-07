import React, { useState, useEffect } from "react";
import couponService from "../../services/couponService.jsx";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import OfertaCardHome from "../../components/OfertaCardHome";

export default function Home() {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const data = await couponService.getOffers();
                setOffers(data.slice(0, 5));
            } catch (err) {
                setError("Error al cargar las ofertas destacadas.");
            } finally {
                setLoading(false);
            }
        };

        fetchOffers();
    }, []);

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-extrabold text-center mb-6 text-red-600">¡LAS MEJORES OFERTAS!</h1>

            <section className="mb-12">
                <h2 className="text-2xl text-pink-500 font-bold mb-4">Valentine's Day</h2>
                {loading ? (
                    <p className="text-center text-gray-600">Cargando ofertas...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : offers.length > 0 ? (
                    <Carousel
                        showThumbs={false}
                        showStatus={false}
                        infiniteLoop
                        autoPlay
                        interval={4000}
                        className="rounded-lg shadow-lg"
                    >
                        {offers.map((offer, index) => (
                            <div key={index} className="p-4">
                                <OfertaCardHome offer={offer} />
                            </div>
                        ))}
                    </Carousel>
                ) : (
                    <p className="text-center text-gray-600">No se encontraron ofertas destacadas.</p>
                )}
            </section>

            <section className="text-center mt-12">
                <p className="text-lg text-pink-500 mb-4">¿Ya estás listo para las vacaciones?</p>
                <div className="flex justify-center space-x-2">
                    <span className="w-3 h-3 bg-purple-400 rounded-full"></span>
                    <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
                    <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
                </div>
            </section>
        </div>
    );
}