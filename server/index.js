const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const authRoutes = require('./routes/auth-routes');
const googleAuthRoutes = require('./routes/google-auth-routes');
const { startDb } = require('./db');

const app = express();
const httpServer = http.createServer(app);

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Routes
// test route
app.get('/', (req, res) => res.send('server up and running'));
app.use(authRoutes);
app.use(googleAuthRoutes);

// DB initialization
startDb();

// Socket-io
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
  },
});
// Will call the function on './socket-io', and pass io as argument
require('./socket-io')(io);

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
