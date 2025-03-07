//vista de Rubros del Admin
import { useContext, useState } from "react";
import { AdminContext } from "../../context/AdminContext";

function Rubros() {
  const { rubros, addRubro, updateRubro, deleteRubro } = useContext(AdminContext);
  const [newRubro, setNewRubro] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  // Agregar nuevo rubro
  const handleAddRubro = () => {
    if (newRubro.trim() !== "") {
      addRubro(newRubro);
      setNewRubro("");
    }
  };

  // Editar rubro
  const handleEditRubro = (id) => {
    if (editValue.trim() !== "") {
      updateRubro(id, editValue);
      setEditIndex(null);
      setEditValue("");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Gestión de Rubros</h1>

      {/* Agregar nuevo rubro */}
      <div className="mb-6 flex items-center space-x-4">
        <input
          type="text"
          placeholder="Nuevo rubro"
          className="border p-2 rounded w-full"
          value={newRubro}
          onChange={(e) => setNewRubro(e.target.value)}
        />
        <button
          onClick={handleAddRubro}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Agregar
        </button>
      </div>

      {/* Lista de rubros */}
      <ul className="bg-white shadow-lg rounded-lg border border-gray-200 p-6">
        {rubros.length > 0 ? (
          rubros.map((rubro, index) => (
            <li key={rubro.id} className="flex justify-between border-b py-2 items-center">
              {editIndex === rubro.id ? (
                <>
                  <input
                    type="text"
                    className="border p-2 rounded w-full"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                  <button
                    onClick={() => handleEditRubro(rubro.id)}
                    className="ml-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Guardar
                  </button>
                </>
              ) : (
                <>
                  <span>{rubro.nombre}</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => { setEditIndex(rubro.id); setEditValue(rubro.nombre); }}
                      className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => deleteRubro(rubro.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      Eliminar
                    </button>
                  </div>
                </>
              )}
            </li>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No hay rubros registrados</p>
        )}
      </ul>
    </div>
  );
}

export default Rubros;
