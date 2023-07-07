const userSchema = require("../models/User");

const loginUserWithGoogle = async (accessToken) => {
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

  module.exports = {
    loginUserWithGoogle
  }