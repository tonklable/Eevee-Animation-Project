const express = require('express');
const app1 = express();
const app2 = express();
const http = require('http');
const server1 = http.createServer(app1);
const server2 = http.createServer(app2);
const socketServer = http.createServer();

const { Server } = require("socket.io");
const ip = require('ip');

// The sokémon are on these ports
const io = require("socket.io")(socketServer, {
    cors: {
        origin: [
            "http://localhost:3001",
            "http://localhost:3002",
            "http://localhost:9999",
            "http://" + ip.address() + ":3001",
            "http://" + ip.address() + ":3002",
            "http://" + ip.address() + ":9999"
        ],
        methods: ["GET", "POST"]
    }
});

// Provide assets
app1.use(express.static('public'));

// Set up routers
app1.get('/favicon.ico', (req, res) => {
    res.sendFile(__dirname + '/favicon.ico');
});

// Set up index page
app1.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Set up JSON getter for my sokémon
// TODO: How do you provide /sokemon.html? Hint: Look up ...

app2.use(express.static('public'));

app2.get('/', (req, res) => {
    res.sendFile(__dirname + '/sokemon.html');
});

// Set up JSON getter for my ip
app1.get('/ip', (req, res) => {
    res.send({ 'ip': ip.address() });
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('battle action: attack', (skm) => {
        console.log();
        console.log(skm.name + ' attacked from ' + skm.ip + ":" + skm.port);
        io.emit('hit', {
            currentPlayer: skm
        })

        io.emit('chat message', skm.name + ' attacked')
    })
    socket.on('battle action: dodge', (skm) => {
        console.log();
        console.log(skm.name + ' dodged from ' + skm.ip + ":" + skm.port);
        io.emit('dodge', {
            currentPlayer: skm
        })
        io.emit('chat message', skm.name + ' dodged');
    })
    socket.on('battle action: cry', (skm) => {
        console.log();
        console.log(skm.name + ' cried from ' + skm.ip + ":" + skm.port);
        io.emit('cry', {
            currentPlayer: skm
        })
        io.emit('chat message', skm.name + ' cried')
    })
});

// Run the express server
server1.listen(3001, () => {
    console.log('listening on *:3001');
});

server2.listen(9999, () => {
    console.log('listening on *:9999');
});

// Run the Socket.io server
socketServer.listen(3002, () => {
    console.log('socket.io on 3002');
});