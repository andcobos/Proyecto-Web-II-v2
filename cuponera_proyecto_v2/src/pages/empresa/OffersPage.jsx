import React, { useState } from "react";
import { useOffers } from "../../context/offersContext";
import OfferCard from "../../components/OfferCard";

const OffersPage = () => {
  const { offers = [] } = useOffers(); 
  const [filter, setFilter] = useState("En espera");

  // Filtra solo una vez en cada renderizado
  const filteredOffers = offers.filter((offer) => offer.status === filter);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Mis ofertas</h2>

      {/* Botones de Filtro por Categoria*/}
      <div className="flex gap-2 mb-4">
        {["En espera", "Aprobadas", "Activas", "Pasadas", "Rechazadas", "Descartadas"].map((status) => (
          <button
            key={status}
            className={`px-4 py-2 rounded ${filter === status ? "bg-blue-500 text-white" : "bg-gray-300"}`}
            onClick={() => setFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Ofertas Filtradas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredOffers.length > 0 ? (
          filteredOffers.map((offer) => <OfferCard key={offer.id} offer={offer} />)
        ) : (
          <p className="text-gray-500">No hay ofertas en esta categoría.</p>
        )}
      </div>
    </div>
  );
};

export default OffersPage;
