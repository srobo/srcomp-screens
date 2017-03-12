var express = require('express');

var app = express();

app.use(express.static(__dirname));

app.get('/config.json', function(req, res) {
  res.json({
    'apiurl': process.env.API_URL,
    'streamurl': process.env.STREAM_URL
  });
})

app.listen(process.env.PORT || 3000);
