import React from "react";

export default function ComoFunciona() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center text-purple-600 mb-8">¿Cómo funciona La Cuponera?</h1>

            <section className="space-y-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-pink-500 mb-4">1️⃣ Explora las mejores ofertas</h2>
                    <p className="text-gray-700">
                        Navega por las diferentes categorías y descubre descuentos en restaurantes, belleza, salud, hoteles y mucho más. Usa la barra de búsqueda para encontrar ofertas específicas.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-pink-500 mb-4">2️⃣ Adquiere tus cupones favoritos</h2>
                    <p className="text-gray-700">
                        Una vez que encuentres la oferta que te interesa, haz clic en "Ver Detalles" para conocer más. Si te convence, presiona "Comprar" para adquirir tu cupón de forma rápida y segura.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-pink-500 mb-4">3️⃣ Visualiza y descarga tus cupones</h2>
                    <p className="text-gray-700">
                        Accede a la sección "Mis Cupones" para ver tus cupones disponibles, canjeados o vencidos. Descarga tus cupones en PDF para presentarlos fácilmente en los establecimientos.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-pink-500 mb-4">4️⃣ Canjea y disfruta</h2>
                    <p className="text-gray-700">
                        Presenta tu cupón en el establecimiento correspondiente antes de la fecha de vencimiento y aprovecha los beneficios exclusivos que La Cuponera tiene para ti.
                    </p>
                </div>
            </section>

            <div className="text-center mt-12">
                <p className="text-lg font-semibold text-gray-800">¡Es fácil, rápido y económico!</p>
                <p className="text-gray-600">Aprovecha las mejores ofertas con La Cuponera y ahorra en tus compras diarias.</p>
            </div>
        </div>
    );
}