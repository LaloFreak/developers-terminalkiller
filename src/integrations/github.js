const axios = require('axios');

const getGithubRepos = async(username, token) => {
  const repositories = await axios.get(`https://api.github.com/users/${username}/repos`, {
    headers: {
      Authorization: `token ${token}`,
    }
  });

  return repositories;
}

module.exports = {
  getGithubRepos,
}