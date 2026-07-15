const app = require('./app');
const prisma = require('./config/db');
const http = require('http');

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://192.168.1.23:3000',
  'http://192.168.1.23:5173'
];

async function startServer() {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully!');
    
    const { initSocketServer } = require('./socket');
    const server = http.createServer(app);
    
    // Initialize modular Socket.IO server
    initSocketServer(server);

    server.listen(PORT, HOST, () => {
      console.log(`🚀 Server is running:`);
      console.log(`   Local URL:   http://localhost:${PORT}`);
      console.log(`   Network URL: http://192.168.1.23:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
}

startServer();
// Trigger nodemon restart

