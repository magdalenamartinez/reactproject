
const PopUpUsuario = ({message, onClose}) => {
    return(
        <div className="popUp container">
            <div className="first">
                <h1 className='title'>¡Felicidades! Su Cuenta ha sido creada con éxito en <br/> Empleo Inclusivo</h1>
                <p className='paragraph'>Siguiente Paso: Haga Click en el botón a continuación para comenzar a Buscar Empleos.</p>
            </div>
            <button className='button' type="button">Buscar Empleo</button>
            <div className="second">
                <h2 className='title'>¡¡Comience a Buscar Empleos!!</h2>
                <p className='paragraph'>Le deseamos éxito en su Búsqueda de Empleo y en su Carrera Profesional</p>
            </div>
        </div>
    )
};

export default PopUpUsuario;