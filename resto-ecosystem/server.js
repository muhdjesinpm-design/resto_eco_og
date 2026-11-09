const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Explicit Route Isolation for Multi-Page Ecosystem
app.get('/customer', (req, res) => res.sendFile(path.join(__dirname, 'public/customer.html')));
app.get('/kitchen', (req, res) => res.sendFile(path.join(__dirname, 'public/kitchen.html')));
app.get('/owner', (req, res) => res.sendFile(path.join(__dirname, 'public/owner.html')));

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`RestoOS Server running on http://localhost:${PORT}`);
});