//SET CLIENT FUNCTIONS
function reloadUsers(){
	//CLEAN DOM
	var $usersList = document.querySelector('#user-list');
	var $listChildren = $usersList.children;

	for(let i = $listChildren.length - 1; $listChildren[i]; i--){
		$usersList.removeChild($listChildren[i]);
	}

	//LOAD AND PRINT USERS
	var currentLoggedUsers = sessionStorage.getItem('loggedUsers');

	if(currentLoggedUsers){
		let users = JSON.parse(currentLoggedUsers).users;
		for(let i = 0; i < users.length; i++){
			printUser(users[i]);
		}
	}
}

function printUser(user){
	const $userList = document.querySelector('#user-list');

	var newUserEl = document.createElement('li');
	var newUserName = document.createTextNode(user);
	newUserEl.appendChild(newUserName);

	$userList.appendChild(newUserName);
}

//INIT ALL TASKS
const socket = io('http://localhost:8080');

//SOCKET LISTENERS
socket.on('connect', ()=> {
	console.log('novo user na sala de bate-papo')
	var myName = localStorage.getItem('name');

	socket.emit('chat', {name: myName});

	socket.on('new user', (username) => {
		printUser(username);
	})

	/*socket.on('user disconnected', (user) => {
		let loggedUsers = getCurrentUsersList();

		if(loggedUsers){
			let index = loggedUsers.indexOf(user);
			loggedUsers.splice(index, 1);

			setUsersList(loggedUsers);
			reloadUsers();
		}
	})*/
})