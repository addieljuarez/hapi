'use strict';

const Hapi = require('hapi');
const Good = require('good');

const server = new Hapi.Server();

server.connection({
	port :3000,
});


server.route({
	method : 'GET',
	path : '/',
	handler : function(request, reply){
		reply('Hola mundo');
	}
});


server.route({
	method : 'GET',
	path : '/{name}',
	handler :  function(request, reply){
		reply('Hola, ' + encodeURIComponent(request.params.name) + '¡');
	}
});


server.register({
	register : Good,
	option : {
		reporters : {
			console : [{
				module : 'good-squeeze',
				name : 'Squeeze',
				args : [{
					response : '*',
					log : '*'
				}]
			}, {
				module : 'good-console',
			}, 'stdout']
		}
	}
}, (err) => {

	if(err){
		throw err;;
	}

	server.start((err) => {
		if(err){
			throw err;
		}

		console.log('Server Corriendo en : ${server.info.uri} ');
		console.log(`Server running at: ${server.info.uri}`);

	});

});



// server.register({
//     register: Good,
//     options: {
//         reporters: {
//             console: [{
//                 module: 'good-squeeze',
//                 name: 'Squeeze',
//                 args: [{
//                     response: '*',
//                     log: '*'
//                 }]
//             }, {
//                 module: 'good-console'
//             }, 'stdout']
//         }
//     }
// }, (err) => {

//     if (err) {
//         throw err; // something bad happened loading the plugin
//     }

//    	server.start((err) => {
// 		if(err){
// 			throw err;
// 		}

// 		console.log('Server Corriendo en : ${server.info.uri} ');
// 		console.log(`Server running at: ${server.info.uri}`);
// 	});
// });	







	// server.start((err) => {
	// 	if(err){
	// 		throw err;
	// 	}

	// 	console.log('Server Corriendo en : ${server.info.uri} ');
	// 	console.log(`Server running at: ${server.info.uri}`);
	// });