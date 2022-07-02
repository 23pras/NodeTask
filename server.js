const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes/routes.js');

dotenv.config();

//Connecting to DB
const connectDB = async () => {
  try{
    const db = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    
    console.log(`MongoDB Connected: ${db.connection.host}`);
  } catch (err) {
    console.log(err);
  }
}
connectDB();

const app = express();
app.use(express.json());
app.use(cors());


app.use('/', routes);

const PORT = process.env.PORT;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
  )
);