import React, { useEffect, useState } from 'react';
import CustomModal from './custommodal.js';

const ModalManager = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [showPopUp2, setShowPopUp2] = useState(false);
  const [showPopUp3, setShowPopUp3] = useState(false);
  const [showPopUp4, setShowPopUp4] = useState(false);
  const [showPopUp5, setShowPopUp5] = useState(false);
  const [showPopUp6, setShowPopUp6] = useState(false);
  const [showPopUp7, setShowPopUp7] = useState(false);
  const [showPopUp8, setShowPopUp8] = useState(false);
  const [showPopUp9, setShowPopUp9] = useState(false);
  const [showPopUp10, setShowPopUp10] = useState(false);


  useEffect(() => {
    const successRegistration = localStorage.getItem('successRegistrationUser');
    const successRegistration2 = localStorage.getItem('successRegistrationEnterprise');
    const successSendMail = localStorage.getItem('successSendMail');
    const successPasswordChange = localStorage.getItem('successPasswordChange');
    const TimeExpired = localStorage.getItem('TimeExpired');
    const SecurityProblem = localStorage.getItem('SecurityProblem');
    const deletedAccount = localStorage.getItem('deletedAccount');
    const adminDeleted = localStorage.getItem('adminDeleted');
    const adminValidado = localStorage.getItem('adminValidado');
    const registrationAdmin = localStorage.getItem('registrationAdmin');

    if (successRegistration) {
      setShowPopUp(true);
      localStorage.removeItem('successRegistrationUser');
    } else if (successRegistration2) {
      setShowPopUp2(true);
      localStorage.removeItem('successRegistrationEnterprise');
    } else if (successSendMail) {
        setShowPopUp3(true);
        localStorage.removeItem('successSendMail');
    } else if (successPasswordChange) {
        setShowPopUp4(true);
        localStorage.removeItem('successPasswordChange');
    } else if (TimeExpired) {
        setShowPopUp5(true);
        localStorage.removeItem('TimeExpired');
    } else if (SecurityProblem) {
        setShowPopUp6(true);
        localStorage.removeItem('SecurityProblem');
    } else if (deletedAccount) {
      setShowPopUp7(true);
      localStorage.removeItem('deletedAccount');
  } else if (adminDeleted) {
    setShowPopUp8(true);
    localStorage.removeItem('adminDeleted');
  } else if (adminValidado) {
    setShowPopUp9(true);
    localStorage.removeItem('adminValidado');
  } else if (registrationAdmin) {
    setShowPopUp10(true);
    localStorage.removeItem('registrationAdmin');
  }
  }, []);

  return (
    <div>
      {/*REGISTRO USUARIO*/}
      <CustomModal
        isOpen={showPopUp}
        onClose={() => setShowPopUp(false)}
        title="¡Felicidades! Su Cuenta ha sido creada con éxito en Empleo Inclusivo"
        paragraph="Siguiente Paso: Haga Click en el botón a continuación para comenzar a Buscar Empleos."
        buttonText="Buscar Empleo"
        buttonHref="/busquedadeempleo"
      />

      {/*REGISTRO EMPRESA*/}
      <CustomModal
        isOpen={showPopUp2}
        onClose={() => setShowPopUp2(false)}
        title="¡Felicidades! Su empresa ha sido registrada con éxito en Empleo Inclusivo"
        paragraph="Siguiente Paso: Haga clic en el botón a continuación para Iniciar Sesión."
        buttonText="Iniciar Sesión"
        buttonHref="/inicioSesionEmpresa"
      />

       {/*ENVIAR MAIL*/}
       <CustomModal
        isOpen={showPopUp3}
        onClose={() => setShowPopUp3(false)}
        title="El enlace para reestablecer la contraseña ha sido enviado a su cuenta"
        paragraph="Siguiente Paso: Acceda a su correo electrónico y haga click en el enlace de reestablecimiento."
      />

      {/*CAMBIO DE CONTRASEÑA*/}
      <CustomModal
        isOpen={showPopUp4}
        onClose={() => setShowPopUp4(false)}
        title="La contraseña ha sido reestablecida con éxito."
        paragraph="Ya puede acceder a su cuenta con la nueva contraseña."
        buttonText="Iniciar Sesión"
        buttonHref="/inicioSesion"
      />

      {/*TIEMPO EXPIRADO*/}
      <CustomModal
        isOpen={showPopUp5}
        onClose={() => setShowPopUp5(false)}
        title="La contraseña no se ha podido reestablecer porque el tiempo ha expirado."
        paragraph="Vuelva a Intentarlo."
        buttonText="Reestablecer Contraseña"
        buttonHref="/forgotPassword"
      />

      {/*PROBLEMA DE SEGURIDAD*/}
      <CustomModal
        isOpen={showPopUp6}
        onClose={() => setShowPopUp6(false)}
        title="Se ha detectado un problema de seguridad al intentar reestablecer la contraseña."
        paragraph="Vuelva a Intentarlo."
        buttonText="Reestablecer Contraseña"
        buttonHref="/forgotPassword"
      />

      {/*ELIMINACION DE LA CUENTA*/}
      <CustomModal
        isOpen={showPopUp7}
        onClose={() => setShowPopUp7(false)}
        title="Su cuenta ha sido eliminada con éxito."
        paragraph="Esperamos que vuelva pronto."
      />

       {/*ELIMINACION DE ADMIN*/}
       <CustomModal
        isOpen={showPopUp8}
        onClose={() => setShowPopUp8(false)}
        title="Administrador Eliminado"
        paragraph="Se ha Eliminado la Solicitud de Admin con éxito."
      />

       {/*ADMIN VALIDADO*/}
       <CustomModal
        isOpen={showPopUp9}
        onClose={() => setShowPopUp9(false)}
        title="Administrador Validado"
        paragraph="El nuevo administrador ha sido validado con éxito"
      />
      {/*ADMIN VALIDADO*/}
      <CustomModal
        isOpen={showPopUp10}
        onClose={() => setShowPopUp10(false)}
        title="Solicitud de Administrador"
        paragraph="Su solicitud para crear la cuenta de administrador ha sido registrada,
        dentro de unos días recibirá su clave secreta en el correo proporcionado en caso de que su 
        solicitud haya sido aceptada."
      />
    </div>
  );
};

export default ModalManager;
