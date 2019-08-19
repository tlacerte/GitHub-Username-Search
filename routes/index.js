var express = require('express');
var router = express.Router();
var request = require('request');

const rootURL = 'https://api.github.com/';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {userData: null});
});

router.post('/', function(req, res, next) {
  var options = {
    url: rootURL + 'users/' + req.body.username,
    headers: {
      'User-Agent': 'jim-clark',
      'Authorization': 'token ' + process.env.GITHUB_TOKEN
    }
  };
  request(options, function(err, response, body) {
    var userData = JSON.parse(body);
    options.url = userData.repos_url;
    request(options, function(err, response, body) {
      userData.repos = JSON.parse(body);
      console.log(userData.repos[0]);
      res.render('index', {userData});
    });
  });
});

module.exports = router;