import React, { useEffect } from 'react';
import '../../css/header.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import DropDownMenu from '../dropDown/dropDownMenu.js';
import { useRef } from 'react';
import DropDownChat from '../dropDown/dropDownChat.js';
import { useUser } from '../funcionalidades/userContext.js';
import HeaderComponent from './header/headerComponent.js';
import Login from './header/login.js';
import { useNavigate } from 'react-router-dom';
import DropDownAcc from '../dropDown/dropDownAcc.js';
import { useStyle } from '../styleContext.js';
import getFoto from '../data/getFoto.js';

function Header2() {
  const navigate = useNavigate();
  const {style} = useStyle();

  const chatStyleRef = useRef("chat-hidden");
  const inicioSesionLinkRef = useRef("/inicioSesion");
  const favs = useRef("/misFavoritos");
  const dropDownRef = useRef();
  const dropDownChatRef = useRef();
  const dropDownMenuEIRef = useRef();
  const dropDownAccRef = useRef();
  
  const [dropDown, setDropDown] = useState(false);
  const [dropDownAcc, setDropDownAcc] = useState(false);
  const [dropDownChat, setDropDownChat] = useState(false);
  const [favoritos, setFavoritos] = useState("");
  const [smallScreenMenuVisible, setSmallScreenMenuVisible] = useState(false);


  const {userData, logout} = useUser();


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
        if (dropDownAccRef.current && !dropDownAccRef.current.contains(event.target) && !event.target.classList.contains('image_class')
        && !event.target.classList.contains('link-gradient') ) {
          setDropDownAcc(false);
        }
      }
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

    const handleLogout = () => {
      logout();
      navigate("/");
  }
  const st = {
    menu: style.highContrast ? 'contrastmenu' : '',
    dark: style.darkMode ? 'darkmenu' : '',
  };

  return (
    <header div="header">
    {/*CLIENTE*/}
    {userData && userData.typeUser === 1 && (
        <>
        <HeaderComponent dropDownMenuEIRef={dropDownMenuEIRef} handleMenuEI={handleMenuEI} smallScreenMenuVisible={smallScreenMenuVisible} 
        setSmallScreenMenuVisible={setSmallScreenMenuVisible} cliente={true}/>
        <Login setDropDown={setDropDown} setDropDownChat={setDropDownChat} dropDown={dropDown} dropDownChat={dropDownChat}
        userExist={true} sesionLink={"#"} textInicioSesion={`Hola ${userData.user}`} srcImage={userData.image? `https://backend-empleoinclusivo.onrender.com/uploads/${userData.image}`:'/images/user.png'}/>
        <div ref={dropDownRef}> 
            <DropDownMenu openclass={`drop_down_menu ${dropDown? 'active':'inactive'} ${st.menu} ${st.dark}`} profile={inicioSesionLinkRef.current} logout={handleLogout} favoritos={'/misFavoritos'} setDropDown={setDropDown}/> 
        </div>
        {(() => {
            chatStyleRef.current = 'chat' 
            inicioSesionLinkRef.current = '/perfilUsuario' 
            favs.current = '/misFavoritos' 
            return null;
        })()}
        </>
    )}
    {/*EMPRESA*/}
    {userData && userData.typeUser === 2 && (
        <>
        <HeaderComponent dropDownMenuEIRef={dropDownMenuEIRef} handleMenuEI={handleMenuEI} smallScreenMenuVisible={smallScreenMenuVisible} 
        setSmallScreenMenuVisible={setSmallScreenMenuVisible} empresa={true}/>
        <Login setDropDown={setDropDown} setDropDownChat={setDropDownChat} dropDown={dropDown} dropDownChat={dropDownChat}
        userExist={true} sesionLink={"#"} textInicioSesion={`Cuenta de ${userData.user}`} srcImage={userData.image? `https://backend-empleoinclusivo.onrender.com/uploads/${userData.image}`:'/images/user.png'}/>
        <div ref={dropDownRef}> 
            <DropDownMenu openclass={`drop_down_menu ${dropDown? 'active':'inactive'} ${st.menu} ${st.dark}`} profile={'/perfilEmpresa'} logout={handleLogout} favoritos={'/favoritosEmpresa'} setDropDown={setDropDown}/> 
        </div>
        {(() => {
            chatStyleRef.current = 'chat'
            inicioSesionLinkRef.current = '/perfilEmpresa'
            favs.current = '/favoritosEmpresa'
            return null;
        })()}
        </>
    )}
    {/*SIN INICIAR SESION*/}
    { !userData && (
        <>
        <HeaderComponent dropDownMenuEIRef={dropDownMenuEIRef} handleMenuEI={handleMenuEI} smallScreenMenuVisible={smallScreenMenuVisible} 
        setSmallScreenMenuVisible={setSmallScreenMenuVisible} nosesion={true}/>
        <Login sesionLink='/inicioSesion' textInicioSesion='Iniciar Sesión' srcImage='/images/user.png'/>
        {(() => {
            chatStyleRef.current = 'chat-hidden'
            inicioSesionLinkRef.current = '/inicioSesion'
            return null;
        })()}
        </>
    )}

      <div className='acc_group' ref={dropDownAccRef}>
      <div className="accesibilidad">
        <img className="image_class" src="/images/accesibilidad.png" alt="" onClick={() => setDropDownAcc(!dropDownAcc)}/>
      </div>
      <DropDownAcc openclass={`drop_down_acc ${dropDownAcc? 'active':'inactive'}  ${st.menu} ${st.dark}`}/>
      </div>
     
      <div className='chat_group'>
        <div className={chatStyleRef.current}>
          <img src='/images/chat.png' className="image_class" alt='chat' onClick={() => setDropDownChat(!dropDownChat)}/>
        </div>
        <div ref={dropDownChatRef}>
        <DropDownChat openclass={`drop_down_chat ${dropDownChat? 'active':'inactive'}  ${st.menu} ${st.dark}`} profile={inicioSesionLinkRef.current} logout={logout} favoritos={favoritos}/> 
        </div>
      </div>
      
    </header>
  );
}

export default Header2;
