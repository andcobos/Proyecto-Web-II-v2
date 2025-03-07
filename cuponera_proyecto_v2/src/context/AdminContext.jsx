import { createContext, useReducer, useEffect, useRef } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig"; 
import adminReducer from "./adminReducer";

export const AdminContext = createContext();

// Estado inicial
const initialState = {
  empresas: [],
  rubros: [],
  clientes: [],
};

export const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, initialState);
  const isFetched = useRef(false);

  // Datos de firebase
  useEffect(() => {
    if (!isFetched.current) { 
      const fetchData = async () => {
        try {
          // Obtener empresas
          const empresasSnap = await getDocs(collection(db, "empresas"));
          const empresas = empresasSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          dispatch({ type: "SET_EMPRESAS", payload: empresas });

          // Obtener rubros
          const rubrosSnap = await getDocs(collection(db, "rubros"));
          const rubros = rubrosSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          dispatch({ type: "SET_RUBROS", payload: rubros });

          // Obtener clientes
          const clientesSnap = await getDocs(collection(db, "clientes"));
          const clientes = clientesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          dispatch({ type: "SET_CLIENTES", payload: clientes });

          isFetched.current = true; 
        } catch (error) {
          console.error("Error al obtener datos:", error);
        }
      };

      fetchData();
    }
  }, []);

  // Empresas
  const addEmpresa = async (empresa) => {
    try {
      const docRef = await addDoc(collection(db, "empresas"), empresa);
      dispatch({ type: "ADD_EMPRESA", payload: { id: docRef.id, ...empresa } });
    } catch (error) {
      console.error("Error al agregar empresa:", error);
    }
  };

  const deleteEmpresa = async (id) => {
    try {
      await deleteDoc(doc(db, "empresas", id));
      dispatch({ type: "DELETE_EMPRESA", payload: id });
    } catch (error) {
      console.error("Error al eliminar empresa:", error);
    }
  };

  // Rubros
  const addRubro = async (nombre) => {
    try {
      const docRef = await addDoc(collection(db, "rubros"), { nombre });
      dispatch({ type: "ADD_RUBRO", payload: { id: docRef.id, nombre } });
    } catch (error) {
      console.error("Error al agregar rubro:", error);
    }
  };

  const updateRubro = async (id, newName) => {
    try {
      await updateDoc(doc(db, "rubros", id), { nombre: newName });
      dispatch({ type: "UPDATE_RUBRO", payload: { id, newName } });
    } catch (error) {
      console.error("Error al actualizar rubro:", error);
    }
  };

  const deleteRubro = async (id) => {
    try {
      await deleteDoc(doc(db, "rubros", id));
      dispatch({ type: "DELETE_RUBRO", payload: id });
    } catch (error) {
      console.error("Error al eliminar rubro:", error);
    }
  };

  // Clientes
  const addCliente = async (cliente) => {
    try {
      const docRef = await addDoc(collection(db, "clientes"), cliente);
      dispatch({ type: "ADD_CLIENTE", payload: { id: docRef.id, ...cliente } });
    } catch (error) {
      console.error("Error al agregar cliente:", error);
    }
  };

  const updateCliente = async (id, clienteActualizado) => {
    try {
      await updateDoc(doc(db, "clientes", id), clienteActualizado);
      dispatch({ type: "UPDATE_CLIENTE", payload: { id, clienteActualizado } });
    } catch (error) {
      console.error("Error al actualizar cliente:", error);
    }
  };

  const deleteCliente = async (id) => {
    try {
      await deleteDoc(doc(db, "clientes", id));
      dispatch({ type: "DELETE_CLIENTE", payload: id });
    } catch (error) {
      console.error("Error al eliminar cliente:", error);
    }
  };

  return (
    <AdminContext.Provider value={{ 
      empresas: state.empresas, 
      rubros: state.rubros, 
      clientes: state.clientes,
      addEmpresa,
      deleteEmpresa,
      addRubro,
      updateRubro,
      deleteRubro,
      addCliente, 
      updateCliente, 
      deleteCliente 
    }}>
      {children}
    </AdminContext.Provider>
  );
};
