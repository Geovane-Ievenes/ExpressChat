const socket = io('http://localhost:8080');

socket.on('connect', () => {

	console.log('conectado com o sever !!');
	
	socket.on('gotochat', (user) => {
		localStorage.setItem('name', user.name);

		location.href = `/chat/${user.name}`
	})
})

function login(){
	const name = document.getElementById('name').value;

	socket.emit('login', {name});
}