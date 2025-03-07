import { createContext, useState, useContext } from "react";

const OffersContext = createContext();

// eslint-disable-next-line react/prop-types
export const OffersProvider = ({ children }) => {
    const [offers, setOffers] = useState([]);

    const addOffer = (newOffer) => {
        setOffers((prevOffers) => [...prevOffers, { id: crypto.randomUUID(), ...newOffer }]);
    };

    return (
        <OffersContext.Provider value={{ offers, addOffer }}>
            {children}
        </OffersContext.Provider>
    );
};

export const useOffers = () => useContext(OffersContext);
