const { User } = require("../models/User");

const loginUserWithGoogle = async (req, res) => {
    const { accessToken } = req.body
    try {
      const user = await User.findAll({
        where: {
          token: accessToken,
        },
      });
  
      if (user) {
        const userId = user[0].id;
        const userAlias = user[0].alias;
        const email = user[0].email;
        const googlePic = user[0].googlePic
        const subs = user[0].subscription
        const payload = {
          userId, userAlias, email, googlePic, subs
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