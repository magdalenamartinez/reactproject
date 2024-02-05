import { indicesCalculados } from "../ofertasTrabajo/paginacion";
const handleSearch = (value, setSearchState, setSearchTerm, term, setNumDatos, setCurrentData, setCurrentPagina, data) => {
    setSearchState(value !== '');
    setSearchTerm(value);
  
    let auxOfertas = data.filter(dato =>
      dato[term] && dato[term].toLowerCase().includes(value.toLowerCase())
    );
  
    setNumDatos(auxOfertas.length);
    setCurrentData(indicesCalculados(1, 5, auxOfertas));
    setCurrentPagina(1);
    console.log(value);
  }

  export default handleSearch