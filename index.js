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
    
    server.route([
        {
            method: 'GET',
            path: '/',
            handler: function(request, reply) {
                return `<h1> My modern api </h1>`;
            }
        },
        {
            method: 'GET',
            path: '/api/v1/paintings',
            handler: (req, reply) => {
                return Painting.find();
            }
        },
        {
            method: 'POST',
            path: '/api/v1/paintings',
            handler: (req, reply) => {
                const { name, url, techniques } = req.payload;
                const painting = new Painting({
                    name,
                    url,
                    techniques
                });
                return painting.save();
            }
        },
    ]);    

    await server.start();
    console.log(`Server running at ${server.info.uri}`);
};


init();