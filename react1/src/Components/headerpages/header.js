import React, { useEffect } from 'react';
import '../../css/header.css';
import { Link } from 'react-router-dom';
import { setUserData } from '../funcionalidades/setUserData.js';
import { setEnterpriseData } from '../funcionalidades/setEnterpriseData.js';
import { useState } from 'react';
import DropDownMenu from '../dropDown/dropDownMenu.js';
import { useRef } from 'react';
import DropDownChat from '../dropDown/dropDownChat.js';

function Header() {
  const srcimageRef = useRef("/images/user.png");
  const textInicioRef = useRef("Iniciar Sesión");
  const chatStyleRef = useRef("chat-hidden");
  const inicioSesionLinkRef = useRef("/inicioSesion");
  const dropDownRef = useRef();
  const dropDownChatRef = useRef();
  const dropDownMenuEIRef = useRef();

  const [dropDown, setDropDown] = useState(false);
  const [dropDownChat, setDropDownChat] = useState(false);
  const [userExist, setUserExist] = useState(false);
  const [enterpriseExist, setEnterpriseExist] = useState(false);
  const [logout, setLogout] = useState("");
  const [favoritos, setFavoritos] = useState("");
  const [menuEI, setMenuEI] = useState(false);
  const [smallScreenMenuVisible, setSmallScreenMenuVisible] = useState(false);


    useEffect(() => {
      const handler = (event) => {
        if (dropDownRef.current && !dropDownRef.current.contains(event.target) && !event.target.classList.contains('link_container')
        && !event.target.classList.contains('link-gradient') ) {
          setDropDown(false);
        }
        if (dropDownChatRef.current && !dropDownChatRef.current.contains(event.target) && !event.target.classList.contains('image_class')) {
          setDropDownChat(false);
        }
        if (!dropDownMenuEIRef.current && !dropDownMenuEIRef.current.contains(event.target) 
          ) {
            setSmallScreenMenuVisible(false);
          }
      }
      const chooseData = () => {
        let data = localStorage.getItem('userData');
        let parseData = "";
        let exist = false;
        let logoutName = "";
        let favs = "";
        if (!data) {
          data = localStorage.getItem('enterpriseData');
          if (data) {
            parseData = JSON.parse(data);
            setEnterpriseData(parseData);
            textInicioRef.current = "Cuenta de " + parseData.user;
            inicioSesionLinkRef.current = '/perfilEmpresa';
            logoutName = "enterpriseData";
            favs = "/favoritosEmpresa";
            setEnterpriseExist(true);
          }
        } else {
          parseData = JSON.parse(data);
          setUserData(parseData);
          textInicioRef.current = "Hola " + parseData.user + '!';
          inicioSesionLinkRef.current = '/perfilUsuario';
          logoutName = "userData";
          favs = "/misFavoritos";
        }
        if (data) {
          srcimageRef.current = parseData.image ? `https://backend-empleoinclusivo.onrender.com/uploads/${parseData.image}` : "/images/user.png";
          chatStyleRef.current = "chat";
          exist = true;
        }
        setUserExist(exist);
        setFavoritos(favs);
        setLogout(logoutName);
      };
      chooseData();
      document.addEventListener("mousedown",handler);
      
      return(() => {
        document.removeEventListener("mousedown", handler);
      })

    }, []);

    const handleMenuEI = () => {

      if (window.innerWidth <= 1000) {
        setSmallScreenMenuVisible(!smallScreenMenuVisible);
      }
    }

  return (
    <header div="header">
      <div className="inicio">
            <div className="titulo-icono-container">
                <h1 className="titulo1">EMPLEO INCLUSIVO</h1>
                <h1 className="titulo2">EI</h1>
                <img src="/images/menup.png" alt=""  ref={dropDownMenuEIRef} className="iconmenu image_class" onClick={handleMenuEI}/>
            </div>
            <nav className={`navbar_container ${smallScreenMenuVisible ? 'active' : 'inactive'}`} id="navbar">
              {!enterpriseExist && !userExist &&
                <ul className="ul_container" onClick={()=>setSmallScreenMenuVisible(false)}>
                  <Link to="/" className="link_container"><span className="link-gradient">Inicio</span></Link>
                  <Link to="/busquedadeempleo" className="link_container"><span  className="link-gradient">Buscar Empleo</span></Link>
                  <Link to="/paraempresas" className="link_container"><span  className="link-gradient">Para Empresas</span></Link>
                </ul>
              }
              {enterpriseExist &&
                <ul className="ul_container" onClick={()=>setSmallScreenMenuVisible(false)}>
                  <Link to="/" className="link_container"><span to="/" className="link-gradient">Inicio</span></Link>
                  <Link to="/buscarEmpleados" className="link_container"><span  className="link-gradient">Buscar Empleados</span></Link>
                  <Link to="/busquedadeempleo" className="link_container"><span className="link-gradient">Ver Otras Ofertas</span></Link>
                  <Link to="/ofertasCreadas" className="link_container"><span  className="link-gradient">Ofertas Creadas</span></Link>
                  <Link to="/registroOfertaTrabajo" className="link_container"><span className="link-gradient">Crear Oferta</span></Link>
                </ul>
              }
              {!enterpriseExist && userExist &&
                <ul className="ul_container" onClick={()=>setSmallScreenMenuVisible(false)}>
                  <Link to="/" className="link_container"><span to="/" className="link-gradient">Inicio</span></Link>
                  <Link to="/busquedadeempleo" className="link_container"><span to="/busquedadeempleo" className="link-gradient">Buscar Empleo</span></Link>
                  <Link to="/misFavoritos" className="link_container"><span to="/busquedadeempleo" className="link-gradient">Ver Favoritos</span></Link>
                </ul>
              }   
            </nav>
        </div>
      <div className="login">
        <Link className='link_container hideWhenLittle'
         to={userExist? '#':inicioSesionLinkRef.current} 
         onClick={() => {
          if (userExist) {
            setDropDown(!dropDown);
            if (dropDownChat) {
              setDropDownChat(false);
            }
          }
          }}>
          <span className="link-gradient textlogin">{textInicioRef.current}</span>
          <div className='container_profile_image'>
            <img className="image_class circleImage" src={srcimageRef.current} alt=""/>
          </div>
        </Link>
      </div>
      <div ref={dropDownRef}>
      <DropDownMenu openclass={`drop_down_menu ${dropDown? 'active':'inactive'}`} profile={inicioSesionLinkRef.current} logout={logout} favoritos={favoritos}/> 
      </div>
      <div className="accesibilidad ">
        <Link to="/"><img className="image_class" src="/images/accesibilidad.png" alt=""/></Link>
      </div>
      <div className='chat_group'>
        <div className={chatStyleRef.current}>
          <img src='/images/chat.png' className="image_class" alt='chat' onClick={() => setDropDownChat(!dropDownChat)}/>
        </div>
        <div ref={dropDownChatRef}>
        <DropDownChat openclass={`drop_down_chat ${dropDownChat? 'active':'inactive'}`} profile={inicioSesionLinkRef.current} logout={logout} favoritos={favoritos}/> 
        </div>
      </div>
      
    </header>
  );
}

export default Header;
