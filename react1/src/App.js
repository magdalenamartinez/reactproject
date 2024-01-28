import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/headerpages/header.js';
import Index from './Components/headerpages/index.js';
import BusquedaDeEmpleo from './Components/headerpages/busquedaempleo.js';
import ParaEmpresas from './Components/headerpages/paraempresas.js';
import TengoCuenta from './Components/login/inicioSesion/tengocuenta.js';
import RegistroEmpresa from './Components/login/registroempresa.js';
import RegistroUsuario from './Components/login/registrousuario.js';
import InicioSesion from './Components/login/inicioSesion/iniciosesion.js';
import InicioSesionEmpresa from './Components/login/inicioSesion/tengocuentaempresa.js';
import UserProfile from './Components/profile/userProfile.js';
import EnterpriseProfile from './Components/profile/enterpriseProfile.js';
import MisFavoritos from './Components/fav/Favoritos.js';
import Estadisticas from './Components/profile/estadisticas.js';
import EditarPerfil from './Components/profile/editarPerfil.js';
import EditarPerfilEmpresa from './Components/profile/editarPerfilEmpresa.js';
import ForgotPassword from './Components/passwordpages/ForgotPassword.js';
import ResetPassword from './Components/passwordpages/ResetPassword.js';
import './css/global-styles.css';
import RegistroOferta from './Components/ofertasTrabajo/registroOferta.js';
import OfertasCreadas from './Components/ofertasTrabajo/ofertasCreadas.js';
import Footer from './Components/headerpages/footer.js';
import EditOferta from './Components/ofertasTrabajo/editOferta.js';
import BusquedaEmpleados from './Components/headerpages/busquedaEmpleados.js';
import FavoritosEmpresa from './Components/fav/favoritosEmpresa.js';
import { useEffect } from 'react';




function App() {
 


    return (
    <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tengoCuenta" element={<TengoCuenta />} />
          <Route path="/busquedadeempleo" element={<BusquedaDeEmpleo />} />
          <Route path="/paraempresas" element={<ParaEmpresas />} />
          <Route path="/registroEmpresas" element={<RegistroEmpresa />} />
          <Route path="/registroUsuario" element={<RegistroUsuario />} />
          <Route path="/inicioSesion" element={<InicioSesion />} />
          <Route path="/inicioSesionEmpresa" element={<InicioSesionEmpresa />} />
          <Route path="/perfilUsuario" element={<UserProfile/>} />
          <Route path="/editarPerfil" element={<EditarPerfil/>} />
          <Route path="/editarPerfilEmpresa" element={<EditarPerfilEmpresa/>} />
          <Route path="/perfilEmpresa" element={<EnterpriseProfile/>} />
          <Route path="/misFavoritos" element={<MisFavoritos/>} />
          <Route path="/favoritosEmpresa" element={<FavoritosEmpresa/>} />
          <Route path='/estadisticasPerfil' element={<Estadisticas/>} />
          <Route path='/forgotPassword' element={<ForgotPassword/>} />
          <Route path='/reset-password' element={<ResetPassword/>} />
          <Route path='/registroOfertaTrabajo' element={<RegistroOferta/>} />
          <Route path='/ofertasCreadas' element={<OfertasCreadas/>} />
          <Route path='/editOferta' element={<EditOferta/>} />
          <Route path='/buscarEmpleados' element={<BusquedaEmpleados/>} />
        </Routes>
        <Footer/>
  </Router>
  );
};

export default App;
