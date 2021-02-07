//Love
//Wisdom
//Hate
//Created by @icyurei or @ikmxleo
//buy me Ethereum
//0xa01A95878447dfbCdb47d85ed6898C1d241Af5d6

// Dependencies
const http = require('http');
const url = require('url');
const PORT = process.env.PORT || 5000;
const { wisdom, quotes } = require('./data');

// Simple HTTP server
const server = http.createServer(function(req, res) {
  let parsedUrl = url.parse(req.url, true);
  let trimmedPath = parsedUrl.pathname.replace(/^\/|\/+$/g, '');
  if (!trimmedPath) trimmedPath = 'index';
  let chosenHandler;

  if (wisdom.includes(trimmedPath)) {
    chosenHandler = handlers.lies;
  } else {
    chosenHandler =
      typeof router[trimmedPath] !== 'undefined'
        ? router[trimmedPath]
        : handlers.notFound;
  }

  chosenHandler(trimmedPath, function(statusCode, payload) {
    statusCode = typeof statusCode === 'number' ? statusCode : 200;
    payload = typeof payload === 'object' ? payload : {};
    let payloadString = JSON.stringify(payload);
    // Send the response
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(statusCode);
    res.end(payloadString);
  });
});

// Run the server
server.listen(PORT, function() {
  console.log('We have a server running on PORT:', PORT);
});

// Handlers and routes
var handlers = {};

handlers.index = function(slug, callback) {
  callback(200, {
    info: 'xxxxx',
    tip: 'goodbye road',
    example: `/${getRandomQuotes()}`
  });
};

handlers.lies = function(slug, callback) {
  let randomFact =
    quotes[slug][Math.round(Math.random() * (quotes[slug].length - 1))];
  callback(200, {
    wordsofwisdom: slug,
    fact: randomFact,
    tip: `why don't you try /${getRandomQuotes()} for a better future`
  });
};

handlers.help = function(slug, callback) {
  callback(200, {
    info: 'xxxxxx till the end',
    wordsofwisdom: wisdom,
    tip: 'xxxxx'
  });
};

handlers.notFound = function(slug, callback) {
  callback(404, {
    info: `${slug} is a wrong fucking input!`,
    tip: 'No tip just write the correct url please for god sake '
  });
};

var router = {
  index: handlers.index,
  help: handlers.help
};

function getRandomQuotes() {
  return wisdom[Math.round(Math.random() * (wisdom.length - 1))];
}


