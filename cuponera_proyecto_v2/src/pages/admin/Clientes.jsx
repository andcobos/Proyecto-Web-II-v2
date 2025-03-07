//vista de Clientes del Admin
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";

function Clientes() {
  const { clientes } = useContext(AdminContext);

  const categorizarCupones = (cupones) => {
    return {
      disponibles: cupones.filter(cupon => cupon.estado === "disponible"),
      canjeados: cupones.filter(cupon => cupon.estado === "canjeado"),
      vencidos: cupones.filter(cupon => cupon.estado === "vencido")
    };
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Gestión de Clientes</h1>

      {clientes.length > 0 ? (
        clientes.map((cliente) => {
          const cuponesCategorizados = categorizarCupones(cliente.cupones || []);
          return (
            <div key={cliente.id} className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 mb-6">
              <h2 className="bg-slate-600 text-white text-xl font-semibold p-4 rounded-t-lg">
                {cliente.nombre} ({cliente.email})
              </h2>
              <div className="p-6">
                <p><strong>Teléfono:</strong> {cliente.telefono}</p>
                <p><strong>Dirección:</strong> {cliente.direccion}</p>
              </div>

              {/* Cupones categorizados */}
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-3">Cupones</h3>
                {Object.entries(cuponesCategorizados).map(([categoria, cupones]) => (
                  <div key={categoria} className="mb-4">
                    <h4 className="text-md font-bold bg-gray-200 p-2 rounded">
                      {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
                    </h4>
                    {cupones.length > 0 ? (
                      <ul>
                        {cupones.map((cupon) => (
                          <li key={cupon.id} className="border-b py-2">
                            <strong>{cupon.nombre}</strong> - Descuento: {cupon.descuento}% - Vence: {cupon.fechaVencimiento}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 text-sm">No hay cupones en esta categoría</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-gray-500 text-sm">No hay clientes registrados</p>
      )}
    </div>
  );
}

export default Clientes;
