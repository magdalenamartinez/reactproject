
let existsUser = true;
let existsMail = true;


const checkUserName = async(username, tableName) => {

    
        try {
            const user = document.getElementById(username);
            if (user) {
                 const res = await fetch(`http://localhost:3000/checkUserRoute/check-username?username=${user.value}&table=${tableName}`);
            const existencia = await res.json();
            if (existencia === true) {
                //Si ya existe tenemos que pedirle que cambie el usuario
                existsUser = true;
            } else {
                existsUser = false;

            }
            }

        } catch (error) {
            console.error('Error al verificar el nombre de usuario:', error);
        }

};


const checkMail = async(correo, tableName) => {

    try {
        const mail = document.getElementById(correo);
        if (mail) {
            const res = await fetch(`http://localhost:3000/checkUserRoute/check-mail?correo=${mail.value}&table=${tableName}`);
            const existencia = await res.json();
            console.log(existencia);
        if (existencia === true) {
            //Si ya existe tenemos que pedirle que cambie el usuario
            existsMail = true;
        } else {
            existsMail = false;

        }
        }

    } catch (error) {
        console.error('Error al verificar el correo:', error);
    }

};

const setExistsUser = (value) => {
    existsUser = value;
};

const setExistsMail = (value) => {
    existsMail = value;
};


const getExistsUser = () => existsUser;
const getExistsMail = () => existsMail;


const checkFolder = {checkUserName, getExistsUser, checkMail, getExistsMail, setExistsUser, setExistsMail };

export default checkFolder;