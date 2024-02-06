const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'empleoinclusivo24@gmail.com',
        pass: 'uigs gwvj aezg wuij'
    }
})

const sendMail = async (to, subject, html) => {
    try {
        const mailOptions = {
            from: 'empleoinclusivo24@gmail.com',
            to,
            subject,
            html,
            attachments: [
              {
                filename: 'logo.png',
                path: './routes/logo.png',
                cid: 'logo'
              }
            ]
        };

        await transporter.sendMail(mailOptions);
        console.log('Correo electrónico enviado con éxito.');
    } catch (error) {
        console.error('Error al enviar el correo electrónico:', error);
        throw error;
    }
};


function generateRegistrationEmail(title, subtitle, textBoton, link) {
    return `
      <div style="text-align: center; font-weight: bold; font-family: 'Poppins', sans-serif; color: #333;">
        <h1 style="font-size: 20px; margin-bottom: 20px;">
            ${title}
        </h1>
        <p style="font-size: 16px; margin-bottom: 20px;">
            ${subtitle}
        </p>
      </div>
      <img src="cid:logo" style="display:block; border-radius:50%; width: 200px; margin: 0 auto; margin-bottom:30px;" alt="Logo de la aplicación"/>
      <a href=${link? link:'https://frontend-empleoinclusivo.onrender.com'} style="
        display: block;
        background: linear-gradient(to right, #247eab, #611668);
        color: #FFFFFF;
        border: none;
        padding: 30px 30px;
        border-radius: 25px;
        font-size: 20px;
        font-family: 'Poppins', sans-serif;
        text-align: center;
        text-decoration:none;
        margin: 0 auto;
        vertical-align: middle;
      ">
        ${textBoton}
      </a>
    `;
  }
  
 
   

module.exports = {
    sendMail,
    generateRegistrationEmail
};
