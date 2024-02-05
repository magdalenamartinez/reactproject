import React from "react";
import { useStyle } from "../../styleContext";

function ErrorMessage({hidden}) {
    const {style} = useStyle();
    const st = {
        errorContrast: style.highContrast ? 'yellow_button' : '',
      };

    return(
        <div className={`message_error_form ${(hidden? hidden:'')} ${st.errorContrast}`} id="message_error_form">
        <p>
            <i className="fa-solid fa-triangle-exclamation" style={{color: '#6e24ab', }}></i>
            &nbsp;&nbsp;Error: &nbsp;&nbsp;Por favor, rellene los campos anteriores correctamente.
        </p>
    </div>
    );
}

export default ErrorMessage;