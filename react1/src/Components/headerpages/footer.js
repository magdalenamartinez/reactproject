import '../../css/footer.css';

function Footer() {


    return(
        <footer className="footer_class">
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