//express http req handle krne ke liye
const express = require('express');
//mongodb se database connect krne ke liye
const mongoose = require('mongoose');
//jab frontend and backend alag alag port pr run kar rahe ho tab kaam aata h cors
const cors = require('cors');
//express app ko http server me convert karne ke liye
const http = require('http');
//real time communication and notifications ke liye
const { Server } = require('socket.io');
//.env file ke variables ko bahar access karne ke liye
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');

const app = express();
const server = http.createServer(app); //http app ka server bnane ke liye

//socket.io server bnaya jo sabhi origin se connection allow krega
const io = new Server(server, {
  cors: { origin: "*" }
});

app.use(cors()); //frontend aur backend ko baat karne ke liye
app.use(express.json()); //req body ko parse karne ke liye

const PORT = process.env.PORT || 5000; 

// MongoDB connect
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(' MongoDB connection error:', err));

// Sample route
app.get('/', (req, res) => {
  res.send(' Backend is running');
});

// Socket connection
io.on('connection', (socket) => {
  console.log(' User connected:', socket.id);

  socket.on('disconnect', () => {
    console.log(' User disconnected:', socket.id);
  });
});

// Server start
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const taskRoutes=require('./routes/TaskRoutes');
app.use('/api/tasks',taskRoutes);
app.use('/api/users', userRoutes); 
let users={};
//har ek connected user ki socket id and username add krenge hum
io.on('connection',(socket)=>{
  console.log(`user cnnected {socket.id}`)
})
