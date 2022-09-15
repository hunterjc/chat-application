const express = require('express')


//object
const app = express();
const http = require('http').createServer(app);

//port
require('dotenv').config()
const port = process.env.PORT
http.listen(port, () => {
    console.log(`listing on port${port}`);
})
//middle
app.use(express.static(__dirname + '/public'))
//route

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})



//socket
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('connected');
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })
})