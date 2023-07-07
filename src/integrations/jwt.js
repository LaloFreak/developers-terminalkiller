const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");

const newToken = async (data, time) => {
  const expiration = time * 60 * 60;
  const payload = {
    data,
    exp: Math.floor(Date.now() / 1000) + expiration
  };
  const token = jwt.sign(payload, JWT_SECRET);
  return token;
};

const decodeToken = async (token) => {
  try {
    const decoded = jwt.verify(token, PRIVATE_SECRET);
    return decoded;
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    throw new Error('Token inválido', error);
  }
};

module.exports = {
  newToken,
  decodeToken
};