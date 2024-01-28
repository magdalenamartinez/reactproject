const recaptcha = require('express-recaptcha');

const site_key ='6Lf8u9woAAAAAPj0gngg3O447Fc3aFSbS0Hs3X6h';
const secret_key ='6Lf8u9woAAAAAEKZy3yCIrEU8wLUcA3adNTGi7DA';
const recaptcha_ = new recaptcha.RecaptchaV2(site_key, secret_key);


