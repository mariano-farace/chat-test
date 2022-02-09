const express = require('express');

const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
// TODO por que esta en las cookies? podría modificar esto mas adelante para que vaya en un header

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200,
};

const http = require('http').createServer(app);

const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(authRoutes);

const PORT = process.env.PORT || 5000;

// TODO desacoplar mongo

const mongoDB = 'mongodb://localhost:27017/chat-app';

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('connected')).catch((err) => console.log(err));

http.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
