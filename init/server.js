'use strict';

const Hapi = require('hapi');

// se crea es server

const server = new Hapi.Server();

server.connection({
	host : 'localhost',
	port : 3000,
});

//  se agrega la ruta
server.route({
	method : 'GET',
	path : '/',
	handler : function(request, reply){

		return reply('hola mundo');
	}
});


// server.route({
// 	method : 'GET',
// 	path : '/{name}',
// 	handler : function(request, reply){
// 		reply('Hola mundo ' + encodeURIComponent(request.params.name) + '!');
// 	}
// });

//  eset es para archvos fijos
server.register(require('inert'), (err) => {

	if(err){
		throw err;
	}

	server.route({
		method : 'GET',
		path : '/hola3',
		handler : function(require, reply){
			reply.file('./public/hola2.html');
		}
	});

});


// iniciamos el servidor

server.start((err) => {
	if(err){
		throw err;
	}

	console.log('Server corriendo en: ', server.info.uri);
});