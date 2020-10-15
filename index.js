const hapi = require('hapi');
const mongoose = require('mongoose');
const Painting = require('./models/Painting');

mongoose.connect('mongodb://localhost:27017/powerfullapi', { useUnifiedTopology: true });

mongoose.connection.once('open', () => {
    console.log('connected to database!')
});

const server = hapi.server({
    port: 4000,
    host: 'localhost'
});

const init = async () => {
    
    server.route({
        method: 'GET',
        path: '/',
        handler: function(request, reply) {
            return `<h1> My modern api </h1>`;
        }
    });    

    await server.start();
    console.log(`Server running at ${server.info.uri}`);
};


init();