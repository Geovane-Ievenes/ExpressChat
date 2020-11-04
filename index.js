//Configurando server e importando módulos

const express = require('express'),
	  app = express(),
	  server = require('http').createServer(app),
	  io = require('socket.io')(server),
	  bodyParser = require('body-parser'),
	  router = require('./routes');

//Middlewares
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Routes
app.use(require('./routes'));

//Configurando Nunjucks
const nunjucks = require('nunjucks');
nunjucks.configure("views", {
	express: app,
	noCache: true
})

//SOCKET HANDLERS
const loggedUsers = [];

io.on('connection', (socket) => {
	console.log('new client connected !!');
	
})

//SERVER LISTENING
server.listen(8080, () => {
	console.log('Server running !!')
})

	/*socket.on('disconnect' , (reason) => {
		if(reason == 'ping timeout'){
			socket.broadcast.emit('user disconnected', user)
		}
	})*/