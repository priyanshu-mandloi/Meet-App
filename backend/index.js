const express = require('express'); // Express is a Node.js framework that facilitates routing, middleware handling, template rendering, static file serving, error management, and easy integration with Node.js modules for web development.
const app = express();         // This will give you all the functionalities of Express.
const dotenv = require('dotenv');
const http = require('http');       // This is used to facilitate the http request coming from frontend  that why we have used it.
 const server = http.createServer(app);
const cors = require('cors');   // This is used to handle api send from server to frontend
const socket =  require('socket.io');
const io = socket(server,{            // Set up the socket connection with cors and setting up the methods to be used.
  cors:{
    origin:'*',
    methods:["GET","Post"]
  }
});

app.use(cors());          

const PORT = process.env.PORT || 5000;

app.get('/',function(req,res){                   // we have used it so that whenever anyone is trying to access our project it will get this message.
   res.send("Server is Running")
});

io.on('connection',(socket)=>{    // This is for the receiever side where we will get the request from the server, Here we have a callback function that provide us the socket so on connection we need to emit the message as done below.
  socket.emit('me',socket.id);
  socket.on('disconnect',()=>{
      socket.broadcast.emit('callended');
  });
  socket.on('calluser',({userToCall,signalData,from,name})=>{    //Yeh  dusre client ko 'calluser' event ke saath ek signal bhejne ke liye emit karte he .
       io.to({userToCall}.emit('calluser',{signal:signalData,from,name}))
  });
  socket.on('answercall',(data)=>{     
     io.to(data.to).emit('callaccepted',data.signal);     
  });
   
});

server.listen(PORT,function(){     // This will show taht our server is running on port 5000
  console.log(`Server is listening on port ${PORT}`); 
});


