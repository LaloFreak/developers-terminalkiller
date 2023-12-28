const github = require('github-profile');

const getGithubProfile = async(username, email) => {
  try {
    const response = await github(email);
    return response;

  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = {
  getGithubProfile,
}