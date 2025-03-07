const adminReducer = (state, action) => {
    switch (action.type) {
      case "SET_EMPRESAS":
        return { ...state, empresas: action.payload };
      case "SET_RUBROS":
        return { ...state, rubros: action.payload };
      case "SET_CLIENTES":
        return { ...state, clientes: action.payload };
      case "ADD_EMPRESA":
        return { ...state, empresas: [...state.empresas, action.payload] };
      case "DELETE_EMPRESA":
        return { ...state, empresas: state.empresas.filter(empresa => empresa.id !== action.payload) };
      default:
        return state;

      case "ADD_RUBRO":
        return { ...state, rubros: [...state.rubros, action.payload] };   
      case "UPDATE_RUBRO":
        const updatedRubros = state.rubros.map((rubro, i) =>
            i === action.payload.index ? action.payload.newName : rubro
        );
        return { ...state, rubros: updatedRubros };
      case "DELETE_RUBRO":
        return { ...state, rubros: state.rubros.filter((_, i) => i !== action.payload) };
          
    }
};
  
  export default adminReducer;