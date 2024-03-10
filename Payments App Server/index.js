const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3006;
const connect = require("./Database/Db");
const router = require('./Routes/index');
const cors = require("cors");
const path = require('path');


app.use(express.static(__dirname));


app.use('/images', express.static(path.join(__dirname, 'images')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Using cors
app.use(cors());

// Body-parser
app.use(express.json());

// Database connection
connect();

// Routing the requests to /api/v1
app.use("/api/v1", router);

app.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
});
