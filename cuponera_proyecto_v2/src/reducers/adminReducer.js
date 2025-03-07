const adminReducer = (state, action) => {
    switch (action.type) {
  
      case "SET_EMPRESAS":
        return { ...state, empresas: action.payload };
      case "ADD_EMPRESA":
        return { ...state, empresas: [...state.empresas, action.payload] };
      case "DELETE_EMPRESA":
        return { ...state, empresas: state.empresas.filter(empresa => empresa.id !== action.payload) };
  
  
      case "SET_RUBROS":
        return { ...state, rubros: action.payload };
      case "ADD_RUBRO":
        return { ...state, rubros: [...state.rubros, action.payload] };
      case "UPDATE_RUBRO":
        return {
          ...state,
          rubros: state.rubros.map(rubro => rubro.id === action.payload.id ? { ...rubro, nombre: action.payload.newName } : rubro)
        };
      case "DELETE_RUBRO":
        return { ...state, rubros: state.rubros.filter(rubro => rubro.id !== action.payload) };
  
  
      case "SET_CLIENTES":
        return { ...state, clientes: action.payload };
      case "ADD_CLIENTE":
        return { ...state, clientes: [...state.clientes, action.payload] };
      case "UPDATE_CLIENTE":
        return {
          ...state,
          clientes: state.clientes.map(cliente =>
            cliente.id === action.payload.id ? { ...cliente, ...action.payload.clienteActualizado } : cliente
          )
        };
      case "DELETE_CLIENTE":
        return { ...state, clientes: state.clientes.filter(cliente => cliente.id !== action.payload) };
  
      default:
        return state;
    }
  };
  
  export default adminReducer;
  