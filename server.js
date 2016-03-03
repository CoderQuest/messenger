var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var moment = require('moment');
var now = moment();
//  tells node to start a new server and use the 'app' as boilerplate
var http = require('http').Server(app);

// this is the format that socket.io expects
var io = require('socket.io')(http);

// path to the directory 
app.use(express.static(__dirname + '/public'))

var clientInfo = {};

// listen to events
// takes in an event name
// 'socket' in the function is the indivial connection 
io.on('connection', function(socket) {
	console.log('User connected via socket.io!');

	// disconnect has to be used in this event, no custom made names
	// socket.on('disconnect', function () {
	// 	if (typeof clientInfo[socket.id] !== 'undefined') {
	// 		socket.leave(clientInfo[socket.id].room);
	// 		// io.to(clientInfo[socket.id].room).emit('message', {
	// 		// 	name: 'System',
	// 		// 	text: clientInfo[socket.id].name + " has left!"
	// 		// });
	// 		// lets us delete an attribute from an object
	// 		// delete clientInfo[socket.id];
	// 	}
	// })
	

	// the argument 'request' is the object from the app.js section
	socket.on('joinRoom', function(request) {
		// socket.id is where socket.io stores unique identifier and set the id == request object
		clientInfo[socket.id] = request;

		// .join that tells socket to join a specific room
		socket.join(request.room);		

		// broadcasting message to the room 
		socket.broadcast.to(request.room).emit('message', {
			name: 'System',
			text: request.name + ' has joined the chat room.' 
		});


	// listening message event. sents to the front-end
	socket.on('message', function(message) {
		console.log('Message received:' + message.text);
		// sends the message to everyone except for the person that wrote it, use io.emit if you also want it to send to the creator		
		// socket.broadcast.emit('message', message);

		message.createdAt = now.valueOf();
		io.to(clientInfo[socket.id].room).emit('message', message);
	});

	
	});

	// timestamp property - Javascript timestamp (mili second)

	// emits an event that takes in two argument, (event name, data to send)
	// sends in the back-end

	socket.emit('message', {
		text: 'Welcome to the chat Room!',
		name: 'System --> '
		// createdAt: now.valueOf()
	});
});

// starts the server
http.listen(PORT, function() {
	console.log('Server Started!')
})