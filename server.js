// Import express and path modules.
const express = require( "express");
const path = require( "path");
const qs = require("querystring");
// Create the express app.
const app = express();
// Define the static folder.
app.use(express.static(path.join(__dirname, "./static")));
// Setup ejs templating and define the views folder.
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// Root route to render the index.ejs view.
app.get('/', function(req, res) {
 res.render("index");
})
// Start Node server listening on port 8000.
const server = app.listen(8000, function() {
 console.log("listening on port 8000");
})
const io = require('socket.io').listen(server);
let chatHistory = [];
io.sockets.on('connection', function (socket) {
    console.log("Client/socket is connected!");
    console.log("Client/socket id is: ", socket.id);
    // all the server socket code goes in here
    socket.on( "new_user_info", function (data){
        socket.emit('chat_history', chatHistory);
    });

    socket.on("chat_message", function (data) {
        console.log("got chat message", data)
        chatHistory.push(data);
        io.emit('new_message', data);
    });
  })