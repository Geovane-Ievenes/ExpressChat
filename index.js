//Configurando server e importando módulos

const express = require('express'),
	  app = express(),
	  server = require('http').createServer(app),
	  io = require('socket.io')(server),
	  path = require('path'),
	  ip = require('ip');

//Rotas Estáticas
app.use(express.static('public'));

//Configurando Nunjucks
const nunjucks = require('nunjucks');
nunjucks.configure("views", {
	express: app,
	noCache: true
})

//ROTAS

app.get('/' , (req, res) => {
	res.render('index.html')
})

app.get('/chat/:name', (req, res) => {

	const username = req.params.name;

	res.render('chat.html', {username})
})

app.get('/messages', (req, res)=>{
	res.render('messages.html')
})

//SOCKET HANDLERS
const loggedUsers = [];

io.on('connection', (socket) => {
	console.log('new client connected !!');
	user = {};
	var myNameIndex;
	
	socket.on('login', userInfo => {
		user.name = userInfo.name;
		loggedUsers.push(user.name);

		socket.broadcast.emit('new user', user.name);
		socket.emit('gotochat', user);
	})

	socket.on('chat', (user) => {
		myNameIndex = loggedUsers.indexOf(user.name);

		console.log(user.name);
		console.log(myNameIndex);
		socket.emit('sendLoggedUsers', loggedUsers.slice(myNameIndex, 1))
	})

	socket.on('disconnect', (reason) => {
		if(reason == 'ping timeout'){

		}
	})	
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