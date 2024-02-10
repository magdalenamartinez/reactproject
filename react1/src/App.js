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
const EditarPerfil = lazy(() => import('./Components/profile/editarPerfil.js'));
const EditarPerfilEmpresa = lazy(() => import('./Components/profile/editarPerfilEmpresa.js'));
const ForgotPassword = lazy(() => import('./Components/passwordpages/ForgotPassword.js'));
const ResetPassword = lazy(() => import('./Components/passwordpages/ResetPassword.js'));
const RegistroOferta = lazy(() => import('./Components/ofertasTrabajo/registroOferta.js'));
const OfertasCreadas = lazy(() => import('./Components/ofertasTrabajo/ofertasCreadas.js'));
const EditOferta = lazy(() => import('./Components/ofertasTrabajo/editOferta.js'));
const BusquedaEmpleados = lazy(() => import('./Components/headerpages/busquedaEmpleados.js'));
const FavoritosEmpresa = lazy(() => import('./Components/fav/favoritosEmpresa.js'));
const DashBoard = lazy(() => import('./Components/admin/dashboard.js'));
const AdminEmpresas = lazy(() => import('./Components/admin/adminempresas.js'));
const AdminClientes = lazy(() => import('./Components/admin/adminclientes.js'));
const AdminOfertas = lazy(() => import('./Components/admin/adminofertas.js'));
const AdminRegistration = lazy(() => import('./Components/login/inicioSesion/registerAdmin.js'));
const OfertasPorEmpresa = lazy(() => import('./Components/admin/ofertasPorEmpresa.js'));
const ChatClientes = lazy(() => import('./Components/admin/chat/chatClientes.js'));
const ChatEmpresas = lazy(() => import('./Components/admin/chat/chatEmpresas.js'));
const ChatById = lazy(() => import('./Components/admin/chat/chatbyid.js'));

function App() {
  const {userData, logout} = useUser();
  const { style } = useStyle();
  const isLargeFont = style.font && style.fontSize > 20;
  const bodyStyle = {
    fontSize: style.font ? `${style.fontSize}px` : '15px',
    overflowX: isLargeFont? `scroll` : 'hidden',
  };

  return (
    <div style={bodyStyle} className={`${style.highContrast ? 'contrast' : ''}  ${style.darkMode ? 'dark' : ''} ${(!style.highContrast && !style.darkMode && (!userData || (userData && userData.typeUser !== 3))? 'body' : '')} ${(userData && userData.typeUser === 3 )? 'blackBackground':''}`}>
    <Router>
      <Header2 />
      <Suspense fallback={<Spinner/>}>
      <Routes>
          <Route element={<ProtectedRoute redirectPath="/dashboard_admin" condition={userData === null || userData.typeUser !== 3}/>}>
            <Route path="/" element={<Index />} />
            <Route path="/busquedadeempleo" element={<BusquedaDeEmpleo />} />
            </Route>
          {/*RUTAS PROTEGIDAS SESION INICIADA*/}
          <Route element={<ProtectedRoute redirectPath="/" condition={userData === null}/>}>
             <Route path="/tengoCuenta" element={<TengoCuenta />} />
             <Route path="/registroEmpresas" element={<RegistroEmpresa />} />
             <Route path="/registroUsuario" element={<RegistroUsuario />} />
             <Route path="/inicioSesion" element={<InicioSesion />} />
             <Route path="/inicioSesionEmpresa" element={<InicioSesionEmpresa />} />
             <Route path="/paraempresas" element={<ParaEmpresas />} />
             <Route path="/forgotPassword" element={<ForgotPassword />} />
             <Route path="/registerAdmin" element={<AdminRegistration />} />
             <Route path="/reset-password" element={<ResetPassword />} />
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
            <Route path="/BeneficiosInclusion" element={<BeneficiosInclusion />} />
          </Route>
          {/*RUTAS SOLO PARA SESION INICIADA DE CLIENTE*/}
          <Route element={<ProtectedRoute redirectPath="/" condition={userData !== null && userData.typeUser === 1}/>}>
            <Route path="/perfilUsuario" element={<UserProfile />} /> 
            <Route path="/misFavoritos" element={<MisFavoritos />} />
            <Route path="/editarPerfil" element={<EditarPerfil />} />
          </Route>
          {/*RUTAS SOLO PARA ADMIN*/}
          <Route element={<ProtectedRoute redirectPath="/" condition={userData !== null && userData.typeUser === 3}/>}>
            <Route path="/dashboard_admin" element={<DashBoard />} />
            <Route path="/adminOfertas" element={<AdminOfertas />} />
            <Route path="/adminClientes" element={<AdminClientes />} />
            <Route path="/adminEmpresas" element={<AdminEmpresas />} />
            <Route path="/ofertasPorEmpresa/:empresaName/:empresaId" element={<OfertasPorEmpresa />} />
            <Route path="/conversacionById/:id/:type/:user" element={<ChatById />} />
            <Route path="/chatClientes/mensajesClientes/:table/:type" element={<ChatClientes />} />
            <Route path="/chatEmpresas/mensajesEmpresas/:table/:type" element={<ChatEmpresas />} />
          </Route>
        </Routes>
      </Suspense>
      <Footer />
    </Router>
    </div>
  );
}

export default App;
