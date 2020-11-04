const express = require('express');
const router = express.Router();

router.get('/' , (req, res) => {
	res.render('index.html')
})

router.post('/chat', (req, res) => {
	const username = req.body.username;
	
	res.render('chat.html', {username})
})

router.get('/messages', (req, res)=>{
	res.render('messages.html')
})

module.exports = router;