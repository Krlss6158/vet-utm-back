import nodemailer from 'nodemailer';

const user = process.env.USER_MAIL;
const pass = process.env.PASS_MAIL;

const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: user,
        pass: pass,
    },
});


export const sendPasswordMail = (
    name,
    lastname,
    email,
    _pass
) => {
    console.log("Check");
    transport.sendMail({
        from: user,
        to: email,
        subject: "Contraseña temporal",
        html: ` 
              <h2>Hola, ${lastname} ${name}</h2>
              <p>Utiliza esta contraseña para iniciar sesión, la podrás cambiar después.</p>
              <p>Expira en 1 hora.</p>
              <p>${_pass}</p>
              </div>`,
    }).catch((err) => console.log(err));
}

module.exports.sendRestartPassword = (id, name, lastname, mail, confirmationCode) => {
    transport.sendMail({
        from: user,
        to: mail,
        subject: "Please restart your password",
        html: `<h1>Restart Password</h1>
    <h2>Hello ${lastname} ${name}</h2>
    <p>Enter the following link to restore your password</p>
    <a href=${url_front}/fpassword/${id}/${confirmationCode}> Click here</a>
    `
    }).catch(e => console.log(e))
}