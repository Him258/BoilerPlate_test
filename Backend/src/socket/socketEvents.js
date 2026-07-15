const presenceSocket = require('./presenceSocket');
const chatSocket = require('./chatSocket');
const typingSocket = require('./typingSocket');
const notificationSocket = require('./notificationSocket');

/**
 * Main socket connection event coordinator.
 * Binds presence, chat, typing, and notifications features to connected sockets.
 */
module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`[SocketServer] Client connected: ${socket.id} (User: ${socket.user.userId})`);
    
    // Initialize functional sub-modules
    presenceSocket(io, socket);
    chatSocket(io, socket);
    typingSocket(io, socket);
    notificationSocket(io, socket);
  });
};
