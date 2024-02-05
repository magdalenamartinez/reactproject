import React from "react";
import { Link } from "react-router-dom";
import { useStyle } from "../../styleContext";
function Login({sesionLink, userExist, setDropDown, dropDown, dropDownChat, setDropDownChat, 
textInicioSesion, srcImage}) {
    const {style} = useStyle();
    
    const st = {
        cont: style.highContrast ? 'contrastlink' : '',
        cont2: style.highContrast ? 'link-contrast' : '',
      };
    return(
        <div className="login">
        <Link className={`link_container ${st.cont} hideWhenLittle`}
         to={sesionLink} 
         onClick={() => {if (userExist) {setDropDown(!dropDown); if (dropDownChat) {setDropDownChat(false);}}}}>
            <span className={`link-gradient ${st.cont2} textlogin`}>{textInicioSesion}</span>
            <div className='container_profile_image'>
                <img className="image_class circleImage" src={srcImage} alt=""/>
            </div>
        </Link>
      </div>
    );
}

export default Login;