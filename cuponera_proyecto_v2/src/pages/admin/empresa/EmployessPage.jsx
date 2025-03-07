import React from "react";
import { useEmployees } from "../../../context/employeesContext";


const EmployeesPage = () => {
    const { employees } = useEmployees();

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Empleados</h2>
            <div className="bg-white p-4 shadow-md rounded-md">
                <ul className="space-y-2">
                    {employees.map((emp) => (
                        <li key={emp.id} className="flex justify-between border-b pb-2">
                            <span>{`${emp.name} ${emp.lastName}`}</span>
                            <div className="space-x-2">
                                <button className="text-yellow-500">✏️</button>
                                <button className="text-red-500">🗑️</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default EmployeesPage;
