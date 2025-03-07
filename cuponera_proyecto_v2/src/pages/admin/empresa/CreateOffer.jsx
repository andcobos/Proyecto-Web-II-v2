import React, { useState } from "react";

const CreateOffer = ({ closeModal, addOffer }) => {
    const [offerData, setOfferData] = useState({
        title: "",
        regularPrice: 0,
        offerPrice: 0,
        startDate: "",
        endDate: "",
        expirationDate: "",
        couponLimit: null,
        description: "",
        details: "",
        image: null,
        status: "En espera",
        couponsSold: 0,
        commissionPercentage: 10,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setOfferData({
            ...offerData,
            [name]: name.includes("Price") || name === "couponLimit"
                ? value === "" ? (name === "couponLimit" ? null : 0) : Number(value)
                : value,
        });
    };

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setOfferData((prevState) => ({ ...prevState, image: e.target.files[0] }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!offerData.title || !offerData.offerPrice || !offerData.startDate || !offerData.endDate) return;

        addOffer({ ...offerData, id: crypto.randomUUID() });

        setOfferData({
            title: "",
            regularPrice: 0,
            offerPrice: 0,
            startDate: "",
            endDate: "",
            expirationDate: "",
            couponLimit: null,
            description: "",
            details: "",
            image: null,
            status: "En espera",
            couponsSold: 0,
            commissionPercentage: 10,
        });

        closeModal();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-md shadow-md w-full max-w-3xl">
                <h2 className="text-xl font-bold mb-4 text-center">Crear Oferta</h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Título"
                        className="w-full border p-2 rounded"
                        value={offerData.title}
                        onChange={handleChange}
                        required
                    />

                    <div className="flex gap-4">
                        <input
                            type="number"
                            name="regularPrice"
                            placeholder="Precio regular"
                            className="w-1/2 border p-2 rounded"
                            value={offerData.regularPrice}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="number"
                            name="offerPrice"
                            placeholder="Precio de la oferta"
                            className="w-1/2 border p-2 rounded"
                            value={offerData.offerPrice}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="flex gap-4">
                        <input
                            type="date"
                            name="startDate"
                            className="w-1/3 border p-2 rounded"
                            value={offerData.startDate}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="date"
                            name="endDate"
                            className="w-1/3 border p-2 rounded"
                            value={offerData.endDate}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="date"
                            name="expirationDate"
                            className="w-1/3 border p-2 rounded"
                            value={offerData.expirationDate}
                            onChange={handleChange}
                        />
                    </div>

                    <input
                        type="number"
                        name="couponLimit"
                        placeholder="Cantidad límite de cupones (opcional)"
                        className="w-full border p-2 rounded"
                        value={offerData.couponLimit ?? ""}
                        onChange={handleChange}
                    />

                    <textarea
                        name="description"
                        placeholder="Descripción"
                        rows="3"
                        className="w-full border p-2 rounded"
                        value={offerData.description}
                        onChange={handleChange}
                        required
                    ></textarea>

                    <div className="border p-4 rounded-md flex flex-col items-center">
                        <label className="text-gray-600 mb-2">Subir imagen</label>
                        <input
                            type="file"
                            name="imageOffer"
                            accept="image/*"
                            className="w-full"
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className="flex justify-between">
                        <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded" onClick={closeModal}>
                            Cancelar
                        </button>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                            Crear Oferta
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateOffer;
