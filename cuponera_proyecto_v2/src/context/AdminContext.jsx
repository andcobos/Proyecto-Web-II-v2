import { createContext, useReducer, useEffect, useRef } from "react";
import { db } from "../firebase/config";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp
} from "firebase/firestore";

export const AdminContext = createContext();

// Initial state
const initialState = {
  empresas: [],
  rubros: [],
  clientes: []
};

export const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, initialState);
  const isFetched = useRef(false);

  // Fetch data from Firebase
  useEffect(() => {
    if (!isFetched.current) {
      const fetchData = async () => {
        try {
          // Get companies from the correct collection
          const empresasSnap = await getDocs(collection(db, "companies"));
          const empresas = empresasSnap.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          dispatch({ type: "SET_EMPRESAS", payload: empresas });

          // Get other collections similarly
          const rubrosSnap = await getDocs(collection(db, "categories"));
          const rubros = rubrosSnap.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          dispatch({ type: "SET_RUBROS", payload: rubros });

          const clientesSnap = await getDocs(collection(db, "clients"));
          const clientes = clientesSnap.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          dispatch({ type: "SET_CLIENTES", payload: clientes });

          isFetched.current = true;
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, []);

  // Add company function
  const addEmpresa = async (empresa) => {
    try {
      // Format the data according to your Firebase schema
      const empresaData = {
        name: empresa.nombre,
        companyCode: empresa.codigo,
        address: empresa.direccion,
        contactName: empresa.contacto,
        phone: empresa.telefono,
        email: empresa.correo,
        category: empresa.rubro,
        commissionPercentage: parseFloat(empresa.comision),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      // Add to Firebase
      const docRef = await addDoc(collection(db, "companies"), empresaData);

      // Update local state
      dispatch({
        type: "ADD_EMPRESA",
        payload: {
          id: docRef.id,
          ...empresaData
        }
      });

      return { id: docRef.id, ...empresaData };
    } catch (error) {
      console.error("Error adding company:", error);
      throw error;
    }
  };

  // Delete company function
  const deleteEmpresa = async (id) => {
    try {
      await deleteDoc(doc(db, "companies", id));
      dispatch({ type: "DELETE_EMPRESA", payload: id });
    } catch (error) {
      console.error("Error deleting company:", error);
      throw error;
    }
  };

  return (
      <AdminContext.Provider value={{
        empresas: state.empresas,
        rubros: state.rubros,
        clientes: state.clientes,
        addEmpresa,
        deleteEmpresa
      }}>
        {children}
      </AdminContext.Provider>
  );
};

// Reducer function (assuming you have this elsewhere, keep it as is)
const adminReducer = (state, action) => {
  switch (action.type) {
    case "SET_EMPRESAS":
      return { ...state, empresas: action.payload };
    case "ADD_EMPRESA":
      return { ...state, empresas: [action.payload, ...state.empresas] };
    case "DELETE_EMPRESA":
      return {
        ...state,
        empresas: state.empresas.filter(emp => emp.id !== action.payload)
      };
    case "SET_RUBROS":
      return { ...state, rubros: action.payload };
    case "SET_CLIENTES":
      return { ...state, clientes: action.payload };
    default:
      return state;
  }
};