/////// FRAMEWORK

var express = require('express');
var app = express();  
var server = require('http').Server(app);  
var io = require('socket.io')(server);

var messages = [{
		id:1,
		text:"INICIALIZADO",
		author:"CHAT DE NODE.JS"
	}];

app.use(express.static('public'));

//////////MUESTRA EN EL NAVEGADOR WEB

app.get('/test', function(req,res){
	res.status(200).send("HELLO, PROBANDO NODE.JS");
});

/////////MUESTRA EN EL TERMINAL CUANDO SE CONECTA ALGUIEN

io.on('connection', function(socket){
	console.log('Alguien se conecto al socket');
	socket.emit('messages', messages);

	socket.on('new-message',function(data){
		messages.push(data);

		io.sockets.emit('messages', messages);
	});

});

//MUESTRA EN TERMINAL CUANDO ESTA FUNCIONANDO EL SV

server.listen(8080,function(){
	console.log("servidor corriendo en http://localhost:8080")
});