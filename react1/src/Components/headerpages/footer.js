import { useStyle } from '../styleContext';
function Footer() {
  const {style} = useStyle();

    const st = {
        fondoContrast: style.highContrast ? 'blackfooter' : '',
        fondoDark: style.darkMode ? 'darkFooter':'',
      };

    return(
        <footer className={`footer_class ${st.fondoContrast} ${st.fondoDark}${(userData && userData.typeUser === 3)? 'hidden':''}`}>
                <div className='comun footercomun'>
                    <div className='izq logo_footer_container'>
                        <img className="logo_footer" src="/images/logo_sin_fondo.png" alt="Logo de la Empresa"/>
                    </div>
                    <div className='dch'>
                        <div className='mail'>
                            <i className="fa-solid fa-envelope" ></i> &nbsp;
                            <a href="#" className='enlace_mail'>empleoinclusivo24@gmail.com</a>
                        </div>
                    </div>
                </div>
                <div className="copyright">
                    <p>&copy; 2024 Empleo Inclusivo</p>
                </div>
        </footer>
    );
}

export default Footer;