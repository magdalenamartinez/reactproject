import checkFolder from '../funcionalidades/checkUserName';
const {getExistsUser, getExistsMail} = checkFolder;

function ValidateFormulary(fields) {
    const inputs = document.querySelectorAll('.formulario form input');

const expresiones = {
	user: /^[a-zA-Z0-9\\_\\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	password2: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	tlf: /^\d{7,14}$/ // 7 a 14 numeros.
}



const validateFields = (expresion, input, field) => {
    const isValid = expresion.test(input.value);
	if (isValid) {
		document.getElementById(`${field}_group`).classList.remove('form_group-incorrect');
		document.getElementById(`${field}_group`).classList.add('form_group-correct');
		document.querySelector(`#${field}_group i`).classList.remove('fas');
		document.querySelector(`#${field}_group i`).classList.remove('fa-circle-xmark');
		document.querySelector(`#${field}_group i`).classList.add('fa-solid');
		document.querySelector(`#${field}_group i`).classList.add('fa-circle-check');
		document.querySelector(`#${field}_group .input_error_form`).classList.remove('input_error_form-active');
		fields[field] = true;

	} else {
		document.getElementById(`${field}_group`).classList.add('form_group-incorrect');
		document.querySelector(`#${field}_group i`).classList.remove('fa-solid');
		document.querySelector(`#${field}_group i`).classList.remove('fa-circle-check');
		document.querySelector(`#${field}_group i`).classList.add('fas');
		document.querySelector(`#${field}_group i`).classList.add('fa-circle-xmark');
		document.querySelector(`#${field}_group .input_error_form`).classList.add('input_error_form-active');
		fields[field] = false;
	}
}

const confirm_password = () => {
	const pass1 = document.getElementById('password');
	const pass2 = document.getElementById('password2');
	if (pass1 != null && pass2 != null ) {
		if (pass1.value !== pass2.value ) {
			document.getElementById('password2_group').classList.add('form_group-incorrect');
			document.querySelector('#password2_group i').classList.remove('fa-solid');
			document.querySelector('#password2_group i').classList.remove('fa-circle-check');
			document.querySelector('#password2_group i').classList.add('fas');
			document.querySelector('#password2_group i').classList.add('fa-circle-xmark');
			document.querySelector('#password2_group .input_error_form').classList.add('input_error_form-active');
			fields['password'] = false;
		} else {
			document.getElementById('password2_group').classList.remove('form_group-incorrect');
			document.getElementById('password2_group').classList.add('form_group-correct');
			document.querySelector('#password2_group i').classList.remove('fas');
			document.querySelector('#password2_group i').classList.remove('fa-circle-xmark');
			document.querySelector('#password2_group i').classList.add('fa-solid');
			document.querySelector('#password2_group i').classList.add('fa-circle-check');
			document.querySelector('#password2_group .input_error_form').classList.remove('input_error_form-active');
			fields['password'] = true;
		}
	}
}

const function_checkUser = () => {
	if (getExistsUser() & fields['user'] === true) {
		document.getElementById(`user_group`).classList.add('form_group-incorrect');
		document.querySelector(`#user_group i`).classList.remove('fa-solid');
		document.querySelector(`#user_group i`).classList.remove('fa-circle-check');
		document.querySelector(`#user_group i`).classList.add('fas');
		document.querySelector(`#user_group i`).classList.add('fa-circle-xmark');
		document.querySelector(`#user_group .input_error_form_user`).classList.add('input_error_form_user-active');
	} else if(fields['user'] === false || !getExistsUser()){
		document.querySelector(`#user_group .input_error_form_user`).classList.remove('input_error_form_user-active');
	}
}


const function_checkMail = () => {
	if (getExistsMail() & fields['correo'] === true) {
		document.getElementById(`correo_group`).classList.add('form_group-incorrect');
		document.querySelector(`#correo_group i`).classList.remove('fa-solid');
		document.querySelector(`#correo_group i`).classList.remove('fa-circle-check');
		document.querySelector(`#correo_group i`).classList.add('fas');
		document.querySelector(`#correo_group i`).classList.add('fa-circle-xmark');
		document.querySelector(`#correo_group .input_error_form_mail`).classList.add('input_error_form_mail-active');
	} else if(fields['correo'] === false || !getExistsMail()){
		document.querySelector(`#correo_group .input_error_form_mail`).classList.remove('input_error_form_mail-active');
	}
}


const validarFormulario = (event) => {
	switch (event.target.name) {
		case "user":
			validateFields(expresiones.user, event.target, 'user');
			function_checkUser();
		break;
		case "name":
			validateFields(expresiones.name, event.target, 'name');
		break;
		case "password":
			validateFields(expresiones.password, event.target, 'password');
			confirm_password();
		break;
		case "password2":
			confirm_password();
		break;
		case "correo":
			validateFields(expresiones.correo, event.target, 'correo');
			function_checkMail();
		break;
		case "tlf":
			validateFields(expresiones.tlf, event.target, 'tlf');
            
		break;
		default:
			break;
	}
    updateErrorMessageDisplay();    
}


inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

function updateErrorMessageDisplay() {
	const AllFieldsValid = Object.values(fields).every(value => value);
	const message_error = document.getElementById('message_error_form');

	if (AllFieldsValid) {
		message_error.classList.add('hidden');
	} else{
		message_error.classList.remove('hidden');
    }
}

};

export default ValidateFormulary;
