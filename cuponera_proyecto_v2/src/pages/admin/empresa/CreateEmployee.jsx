import React, { useState } from "react";

const CreateEmployee = ({ closeModal, addEmployee }) => {
    const [employee, setEmployee] = useState({
        name: "",
        lastName: "",
        email: "",
    });

    const handleChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!employee.name || !employee.lastName || !employee.email) return;
        addEmployee(employee);
        setEmployee({ name: "", lastName: "", email: "" });
        if (closeModal) closeModal(); // Cierra el modal después de agregar un empleado
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-md w-96 relative">
                
                <button
                    className="absolute top-2 right-2 text-gray-600"
                    onClick={closeModal}
                >✖</button>

                <h2 className="text-xl font-bold mb-4 text-center">Registrar Empleado</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre"
                        value={employee.name}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Apellido"
                        value={employee.lastName}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Correo Electrónico"
                        value={employee.email}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />

                    <div className="flex justify-between">
                        <button
                            type="button"
                            className="bg-gray-400 text-white px-4 py-2 rounded"
                            onClick={closeModal}
                        >
                            Cancelar
                        </button>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                            Registrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateEmployee;
