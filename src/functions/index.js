const userSchema = require("../models/User");
const { transporter } = require("../integrations/nodemailer");
const { EMAIL_USER } = require("../config/config");

const googleLogin = async (accessToken) => {
  try {
    const user = await userSchema.findOne({ token: accessToken });
    if (user) {
      const userAlias = user.alias;
      const email = user.email;
      const googlePic = user.googlePic
      
      const payload = { userAlias, email, googlePic }

      return payload
    }
    return 'token invalido'
  } catch (error) {
    return console.error(error)
  }
}

const sendEmail = (formData) => {
  const { name, email, message } = formData;
  const mailOptions = {
    from: email,
    to: EMAIL_USER,
    subject: `New message from ${name} (${email})`,
    text: message,
  };
  return transporter.sendMail(mailOptions);
};

module.exports = { 
  googleLogin,
  sendEmail
};