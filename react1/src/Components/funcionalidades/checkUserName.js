
let existsUser = true;
let existsMail = true;


const checkUserName = async(username, tableName) => {

    
        try {
            const user = document.getElementById(username);
            if (user) {
                const res = await fetch(`https://backend-empleoinclusivo.onrender.com/checkUserRoute/check-username?username=${user.value}&table=${tableName}`);
                const existencia = await res.json();
                if (existencia === true) {
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
            const res = await fetch(`https://backend-empleoinclusivo.onrender.com/checkUserRoute/check-mail?correo=${mail.value}&table=${tableName}`);
            const existencia = await res.json();
            if (existencia === true) {
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