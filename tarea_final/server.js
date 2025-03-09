
const express = require('express');
 const http = require('http');
 const { Server } = require('socket.io');
 
 
 const app = express();
 const server = http.createServer(app);
 const io = new Server(server);
 
 
 app.use(express.static('public'));
 
 
 io.on('connection', (socket) => {
     console.log('🔵 Un usuario se ha conectado');
     io.emit('usuario-conectado', 'Un nuevo usuario se ha conectado');
 
     
     socket.on('mensaje', (msg) => {
         console.log('💬 Mensaje recibido:', msg);
         io.emit('mensaje', msg); 
     });
 
     socket.on('escribiendo', (usuario) => {
         socket.broadcast.emit('escribiendo', usuario);
     });
 
     socket.on('actualizar-precio', (precio) => {
         console.log('📈 Nuevo precio actualizado:', precio);
         io.emit('precio-actualizado', precio); 
     });
 
     
     socket.on('disconnect', () => {
         console.log('🔴 Un usuario se ha desconectado');
         io.emit('usuario-desconectado', 'Un usuario se ha desconectado');
     });
 });
 
 // Iniciar el servidor en el puerto 3000
 server.listen(3000, () => {
     console.log('🚀 Servidor corriendo en http://localhost:3000');
 });