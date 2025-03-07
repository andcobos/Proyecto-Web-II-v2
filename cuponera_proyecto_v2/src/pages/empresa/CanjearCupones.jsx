import React, { useState } from "react";
import { useEmployees } from "../../context/employeesContext";

const CanjearCupones = () => {
    const { redeemCoupon } = useEmployees();
    const [couponCode, setCouponCode] = useState("");
    const [userDUI, setUserDUI] = useState("");
    const [message, setMessage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = redeemCoupon(couponCode, userDUI);
        setMessage(result.message);
    };

    return (
        <div className="p-6 bg-white shadow-md rounded-md max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4">Canjear Cupón</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Código del Cupón"
                    className="w-full border p-2 rounded"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="DUI del Cliente"
                    className="w-full border p-2 rounded"
                    value={userDUI}
                    onChange={(e) => setUserDUI(e.target.value)}
                    required
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
                    Canjear Cupón
                </button>
            </form>

            {message && (
                <p className={`mt-4 text-center ${message.includes("éxito") ? "text-green-600" : "text-red-500"}`}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default CanjearCupones;