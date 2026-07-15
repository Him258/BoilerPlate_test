const { initSocketServer, getIO } = require('./socketServer');
const userSocketManager = require('./userSocketManager');

module.exports = {
  initSocketServer,
  getIO,
  userSocketManager
};
