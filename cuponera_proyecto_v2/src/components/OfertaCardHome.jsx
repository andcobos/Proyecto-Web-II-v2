import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export default function OfertaCardHome({ title, description, price, imageUrl }) {
    return (
        <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition duration-200">
            <img
                src={imageUrl}
                alt={title}
                className="w-full h-48 object-cover"
            />
            <div className="p-4 bg-white text-center">
                <h3 className="font-semibold text-xl mb-2 text-gray-800">{title}</h3>
                <p className="text-sm text-gray-600 mb-3">{description}</p>
                <p className="text-lg font-bold text-purple-600 mb-4">{price}</p>
                <Link
                    to="/ofertas/1"
                    className="bg-purple-600 text-white px-5 py-2 rounded-full hover:bg-purple-700 transition"
                >
                    Ver Detalles
                </Link>
            </div>
        </div>
    );
}