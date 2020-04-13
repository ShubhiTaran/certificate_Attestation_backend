
var path = require("path");
var cors=require("cors")
var express = require('express');
const helmet = require('helmet')
var bodyParser = require("body-parser");
var fs = require('fs');
var timeout = require('connect-timeout');
var log4js = require('log4js');
const constants = require('constants')
const config = require('./config/config')
log4js.configure({
  appenders: { app: { type: 'file', filename: 'logs/app.log' } },
  categories: { default: { appenders: ['app'], level: 'info' } }
});
var log = log4js.getLogger("app");

const router = express.Router();
var app = express();
app.use(helmet.frameguard());
app.use(timeout('5s'))
app.use(haltOnTimedout)
var https = require('https');
const mongoose = require("mongoose");

var csrf = require('csurf');
var cookieParser = require('cookie-parser')

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const mongoLink = config['db'];
mongoose .connect( mongoLink, { useNewUrlParser: true } )
  .then(() => {
    log.info("Connected to MongoDB", mongoLink);
    console.log("Connected to MongoDB" , mongoLink)
  })
  .catch(err => {
    log.info("Oops something went wrong", err, mongoLink);
    console.log("Oops something went wrong", err, mongoLink)
    // process.exit(1)
  });
app.use(function(req, res, next) {
  res.setHeader('Content-disposition', 'attachment;');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Max-Age',-1);
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
 next();
});

app.use(express.static('public'));
app.use('/public', express.static(__dirname + '/public'))
console.log(__dirname + '/public')

function haltOnTimedout (req, res, next) {
  if (!req.timedout) next()
}


const port = process.env.PORT || config['express_port'];
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

app.use(cookieParser());

require('./route')(router);
app.use('/', router);
router.options('/',cors());
// create admin
require("./functions/Registration_login/addAdmin")();

try{
var options={
    key:fs.readFileSync('ssl/mahagovprivate.keys'),
  cert:fs.readFileSync('ssl/star_maharashtra_gov_in.crt'),
secureOptions:constants.SSL_OP_NO_TLSv1 | constants.SSL_OP_NO_TLSv1_1
}
https.createServer(options, app).listen(port, function(){
  console.log("Express server listening on port " + port);
  console.log('it is runnig with ssl certificate.')
});
}
catch(error){
  // console.log('need ssl certificate', error);
  app.listen(port, () => {
  log.info("Server listening on port " + port);
 console.log("Server listening on port " + port);
});
}

// app.listen(port, () => {
//   log.info("Server listening on port " + port);
//  console.log("Server listening on port " + port);
// });
