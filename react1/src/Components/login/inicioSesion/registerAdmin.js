import React from "react";
import LoginForm from "./loginForm";
import { useStyle } from "../../styleContext";
import checkFolder from "../../funcionalidades/checkUserName";
import ValidateFormulary from "../../funcionalidades/formulario";
import Usuario from "../registro/usuario";
import InputValidation from "../input/InputValidation";
import Correo from "../registro/correo";
import password_visibility from "../../funcionalidades/password";
import { fieldsAdmin } from "../../funcionalidades/load/load";
import ErrorMessage from "../registro/errorMessage";
import updateData from "../../profile/updateData";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const { getExistsUser, getExistsMail, checkUserName, checkMail} = checkFolder;



function AdminRegistration() {
    const navigate = useNavigate();

    const handleSubmit = async(event) => {
        event.preventDefault();
        const areAllFieldsValid = Object.values(fieldsAdmin).every((value) => value === true);
        if (areAllFieldsValid && getExistsUser() === false && getExistsMail() === false) {
            const form = document.getElementById('form_id');
            const formData = new FormData(form);
            console.log(formData.get('password'));

            try {
                 await updateData(formData, 'admin_registro', navigate);
                  localStorage.setItem('registrationAdmin', 'true');
            } catch (error) {
                console.log('Se ha producido un error', error);
            }
        } else {
            alert('Compruebe que toda la información añadida es correcta.');
        }

    };

    const {style} = useStyle();

    const st = {
        fondoContrast: style.highContrast ? 'formContrast' : '',
        inputContrast: style.highContrast ? 'formInputContrast2' : '',
        botonContrast: style.highContrast ? 'yellow_button' : '',
        fondoDark: style.darkMode ? 'formDark' : '',
        inputDark: style.darkMode ? 'inputDark' : '',
    };

    return(
        <div className="contenedor">
        <Link className='back_link' to='/tengoCuenta'><i className="fa-solid fa-circle-chevron-left"></i></Link>
            <div className={`formulario form_container ${st.fondoContrast} ${st.fondoDark}`}>
                <div className='text_container'>
                <h1 className='title_container'>Registro Admin</h1>
                    <div className="message_error hidden" id="messageError"><p>Se ha producido un error al intentar registrar al Usuario</p></div>
                    <form className="form_class" id="form_id" onSubmit= {handleSubmit} onInput={() => ValidateFormulary(fieldsAdmin)} action="/clientRoute/save-data" encType='multipart/form-data' method="post">
                        <Usuario readOnly={false} onInput={() => checkUserName('user', 'admin')}/>
                        <Correo onInput={() => checkMail('correo', 'admin')} readOnly={false}/>
                        <InputValidation idName={"password"} textLabel={"Contraseña"} typeInput={"password"}
                        errorText={"La contraseña tiene que tener de 4 a 12 dígitos."} pas={'pas1'}
                        clickPassword={() => password_visibility('password', 'pas1')} password={true}                            
                        />
                        <InputValidation idName={"password2"} textLabel={"Confirmar Contraseña"} typeInput={"password"} pas={'pas2'}
                        errorText={"Las contraseñas tienen que ser iguales."}
                        clickPassword={() => password_visibility('password2', 'pas2')} password={true}                            
                        />
                        <button className={`submit_button ${st.botonContrast}`} type="submit">Registrar Admin</button>
                        <ErrorMessage/>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default AdminRegistration;