const { GITHUB_ACCESS_TOKEN_GWERH } = require('../config');
const { getGithubRepos } = require('../integrations/github');
const router = require('express').Router();

router.get('/:username/lasts', async (req, res) => {
  try {
    let token = "";
    const { username } = req.params || null;
    if (username === "GwerhDev") {
      token = GITHUB_ACCESS_TOKEN_GWERH
    };

    const repositories = await getGithubRepos(username, token);

    const response = repositories.data.map(repo => {
      return {
        name: repo.name,
        description: repo.description,
        topics: repo.topics,
        language: repo.language,
        lastUpdated: new Date(repo.pushed_at),
        href: repo.homepage,
        repoUrl: repo.html_url,
        owner: {
          name: repo.owner.login,
          avatarUrl: repo.owner.avatar_url,
          url: repo.owner.html_url,
        },
      }
    });

    response.sort((a, b) => {
      return b.lastUpdated - a.lastUpdated;
    });

    const lastUpdated = response.slice(0, 5);

    return res.status(200).send(lastUpdated);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error al obtener los eventos del usuario');
  }
});

module.exports = router;