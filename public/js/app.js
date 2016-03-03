var name = getQueryVariable('name') || 'Anon';
var room = getQueryVariable('room');
// io() is created when we loaded the socket.io library uptop
var socket = io();


jQuery('.room-title').text(room)
// this one shows up in chrome console
// these information will be sent back to the server.js's joinRoom section
socket.on('connect', function() {
	console.log('Connected to Socket.io Server')
	socket.emit('joinRoom', {
		name: name,
		room: room
	});
})

// listens to message event created in the back-end. 'message' in the argument was created in the server.js
socket.on('message', function(message) {
	var momentTimestamp = moment.utc(message.createdAt);
	var $messages = jQuery('.messages');
	var $message = jQuery('<li class="message"></li>')
	console.log('new message:', message.text);
	$message.append('<p><strong>' + message.name + ' @' + momentTimestamp.local().format('h:mma') + ':</strong></p>');
	$message.append('<p>' + message.text + '</p>');
	$messages.append($message.fadeIn(1000));
})

// Handles submiting of new message
var $form = jQuery('#message-form');

$form.on('submit', function(event) {
	event.preventDefault();
	var $message = $form.find('input[name=message]')
	if ($message.val().length > 0) {
		socket.emit('message', {
			name: name,
			text: $message.val()
		});

		$message.val('');
	}
});