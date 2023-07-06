const userSchema = require("../models/User");

const loginUserWithGoogle = async (req, res) => {
    const { accessToken } = req.body
    try {
      const user = await userSchema.findOne({ token: accessToken });
  
      if (user) {
        const userAlias = user[0].alias;
        const email = user[0].email;
        const googlePic = user[0].googlePic
        
        const payload = {
          userAlias, email, googlePic,
        }
  
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