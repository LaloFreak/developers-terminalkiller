const userSchema = require("../models/User");

const loginUserWithGoogle = async (accessToken) => {
  try {
      const user = await userSchema.findOne({ token: accessToken });
      console.log(user)
      if (user) {
        const userAlias = user.alias;
        const email = user.email;
        const googlePic = user.googlePic
        
        const payload = { userAlias, email, googlePic }

        return payload
      }
      return 'token invalido'
    } catch (error) {
      return console.log(error)
    }
  }

  module.exports = {
    loginUserWithGoogle
  }