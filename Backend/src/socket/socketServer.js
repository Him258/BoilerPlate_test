const { Server } = require('socket.io');
const socketAuth = require('./socketAuth');
const socketEvents = require('./socketEvents');

let io = null;

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://192.168.1.23:3000',
  'http://192.168.1.23:5173'
];

/**
 * Initializes and configures the Socket.IO Server.
 * @param {Object} httpServer - The Node.js HTTP server instance
 */
exports.initSocketServer = (httpServer) => {
  if (io) {
    console.warn('[SocketServer] Socket.IO server is already initialized');
    return io;
  }

  console.log('[SocketServer] Initializing Socket.IO Server...');
  io = new Server(httpServer, {
    cors: {
      origin: allowedOrigins,
      methods: ["GET", "POST"],
      credentials: true
    },
    pingTimeout: 60000,
    pingInterval: 25000
  });

  // Apply authentication middleware
  io.use(socketAuth);

  // Set up event mapping
  socketEvents(io);

  console.log('✅ Socket.IO Server initialized successfully!');
  return io;
};

/**
 * Retrieves the initialized Socket.IO instance.
 */
exports.getIO = () => {
  if (!io) {
    throw new Error('[SocketServer] Socket.IO server has not been initialized yet');
  }
  return io;
};
