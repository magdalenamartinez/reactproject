import './css/global-styles.css';
import React, { lazy, Suspense } from 'react';
import './css/styles.js'
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Header2 from './Components/headerpages/header.js';
import Footer from './Components/headerpages/footer.js';
import Spinner from './Components/spinner.js';
import { StyleProvider } from './Components/styleContext.js';
import { useStyle } from './Components/styleContext.js';
import { useUser } from './Components/funcionalidades/userContext.js';
import ProtectedRoute from './protectedroute.js';

const Index = lazy(() => import('./Components/headerpages/index.js'));
const BusquedaDeEmpleo = lazy(() => import('./Components/headerpages/busquedaempleo.js'));
const ParaEmpresas = lazy(() => import('./Components/headerpages/paraempresas.js'));
const TengoCuenta = lazy(() => import('./Components/login/inicioSesion/tengocuenta.js'));
const RegistroEmpresa = lazy(() => import('./Components/login/registroempresa.js'));
const RegistroUsuario = lazy(() => import('./Components/login/registrousuario.js'));
const InicioSesion = lazy(() => import('./Components/login/inicioSesion/iniciosesion.js'));
const InicioSesionEmpresa = lazy(() => import('./Components/login/inicioSesion/tengocuentaempresa.js'));
const UserProfile = lazy(() => import('./Components/profile/userProfile.js'));
const EnterpriseProfile = lazy(() => import('./Components/profile/enterpriseProfile.js'));
const MisFavoritos = lazy(() => import('./Components/fav/Favoritos.js'));
const Estadisticas = lazy(() => import('./Components/profile/estadisticas.js'));
const EditarPerfil = lazy(() => import('./Components/profile/editarPerfil.js'));
const EditarPerfilEmpresa = lazy(() => import('./Components/profile/editarPerfilEmpresa.js'));
const ForgotPassword = lazy(() => import('./Components/passwordpages/ForgotPassword.js'));
const ResetPassword = lazy(() => import('./Components/passwordpages/ResetPassword.js'));
const RegistroOferta = lazy(() => import('./Components/ofertasTrabajo/registroOferta.js'));
const OfertasCreadas = lazy(() => import('./Components/ofertasTrabajo/ofertasCreadas.js'));
const EditOferta = lazy(() => import('./Components/ofertasTrabajo/editOferta.js'));
const BusquedaEmpleados = lazy(() => import('./Components/headerpages/busquedaEmpleados.js'));
const FavoritosEmpresa = lazy(() => import('./Components/fav/favoritosEmpresa.js'));

function App() {
  const {userData, logout} = useUser();
  const { style } = useStyle();
  const isLargeFont = style.font && style.fontSize > 20;
  const bodyStyle = {
    fontSize: style.font ? `${style.fontSize}px` : '15px',
    overflowX: isLargeFont? `scroll` : 'hidden',
    // ... (other styles)
  };

  return (
    <div style={bodyStyle} className={`${style.highContrast ? 'contrast' : ''}  ${style.darkMode ? 'dark' : ''} ${(!style.highContrast && !style.darkMode ? 'body' : '')}`}>
    <Router>
      <Header2 />
      <Suspense fallback={<Spinner/>}>
        <Routes>
        <Route path="/" element={<Index />} />
          {/*RUTAS PROTEGIDAS SESION INICIADA*/}
          <Route element={<ProtectedRoute redirectPath="/" condition={userData === null}/>}>
             <Route path="/tengoCuenta" element={<TengoCuenta />} />
             <Route path="/registroEmpresas" element={<RegistroEmpresa />} />
             <Route path="/registroUsuario" element={<RegistroUsuario />} />
             <Route path="/inicioSesion" element={<InicioSesion />} />
             <Route path="/inicioSesionEmpresa" element={<InicioSesionEmpresa />} />
             <Route path="/paraempresas" element={<ParaEmpresas />} />
             <Route path="/forgotPassword" element={<ForgotPassword />} />
          </Route>
          {/*RUTAS SOLO PARA SESION INICIADA DE EMPRESA*/}
          <Route element={<ProtectedRoute redirectPath="/" condition={userData !== null && userData.typeUser === 2}/>}>
            <Route path="/editarPerfilEmpresa" element={<EditarPerfilEmpresa />} />
            <Route path="/favoritosEmpresa" element={<FavoritosEmpresa />} />
            <Route path="/perfilEmpresa" element={<EnterpriseProfile />} />
            <Route path="/registroOfertaTrabajo" element={<RegistroOferta />} />
            <Route path="/ofertasCreadas" element={<OfertasCreadas />} />
            <Route path="/editOferta" element={<EditOferta />} />
            <Route path="/buscarEmpleados" element={<BusquedaEmpleados />} />
            <Route path="/estadisticasPerfil" element={<Estadisticas />} />
          </Route>
          {/*RUTAS SOLO PARA SESION INICIADA DE CLIENTE*/}
          <Route element={<ProtectedRoute redirectPath="/" condition={userData !== null && userData.typeUser === 1}/>}>
            <Route path="/perfilUsuario" element={<UserProfile />} /> 
            <Route path="/misFavoritos" element={<MisFavoritos />} />
            <Route path="/editarPerfil" element={<EditarPerfil />} />
          </Route>
          <Route path="/busquedadeempleo" element={<BusquedaDeEmpleo />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </Suspense>
      <Footer />
    </Router>
    </div>
  );
}

export default App;
