const axios = require('axios');

const getGithubRepos = async(username, token) => {
  try {
    const repositories = await axios.get(`https://api.github.com/users/${username}/repos`, {
      headers: {
        Authorization: `token ${token}`,
      }
    });
  
    return repositories;
    
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getGithubRepos,
}