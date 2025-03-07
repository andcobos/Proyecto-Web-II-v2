import React from "react";

const OfferCard = ({ offer }) => {
    const {
        title, regularPrice, offerPrice, startDate, endDate, expirationDate,
        couponLimit, description, couponsSold = 0, commissionPercentage = 10
    } = offer;

    const availableCoupons = couponLimit
        ? Math.max(couponLimit - couponsSold, 0) 
        : "Ilimitado";

    const totalRevenue = couponsSold && offerPrice ? couponsSold * offerPrice : 0;
    const serviceCharge = totalRevenue ? (totalRevenue * (commissionPercentage / 100)) : 0;

    return (
        <div className="bg-white p-4 rounded-md shadow-md border">
            <h3 className="text-lg font-bold">{title}</h3>
            <p><strong>Precio Regular:</strong> ${regularPrice}</p>
            <p><strong>Precio Oferta:</strong> ${offerPrice}</p>
            <p><strong>Vigencia:</strong> {startDate} - {endDate}</p>
            <p><strong>Fecha límite:</strong> {expirationDate || "No especificada"}</p>
            <p><strong>Cantidad disponible:</strong> {availableCoupons}</p>
            <p><strong>Cupones vendidos:</strong> {couponsSold}</p>
            <p><strong>Ingresos totales:</strong> ${totalRevenue.toFixed(2)}</p>
            <p><strong>Cargo por servicio:</strong> ${serviceCharge.toFixed(2)}</p>
            <p><strong>Descripción:</strong> {description}</p>
        </div>
    );
};

export default OfferCard;
