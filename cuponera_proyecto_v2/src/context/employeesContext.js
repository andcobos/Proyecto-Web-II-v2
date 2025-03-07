import { createContext, useState, useContext } from "react";

const EmployeesContext = createContext();

export const EmployeesProvider = ({ children }) => {
    const [employees, setEmployees] = useState([]);

    const addEmployee = (newEmployee) => {
        setEmployees([...employees, { id: employees.length + 1, ...newEmployee }]);
    };

    return (
        <EmployeesContext.Provider value={{ employees, addEmployee }}>
            {children}
        </EmployeesContext.Provider>
    );
};

export const useEmployees = () => useContext(EmployeesContext);
