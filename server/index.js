const express = require('express');
const cors = require("cors")
const mysql = require('mysql2');
const { createUser, getAllUsers, updateUser, deleteUser, singleUser } = require('./controllers/user');

const dotenv = require("dotenv").config()
const app = express();
const PORT = process.env.PORT || 3000;


const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Anonymous@123#',
    database: 'user_schema',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to database successfully!');
        connection.release();
    }
});

app.use(cors({
  methods:["POST","GET","DELETE","PUT"]
}))


app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post("/create",createUser)
app.get('/get-user', getAllUsers);
app.put('/user/:id', updateUser);
app.delete('/user/:id', deleteUser);
app.get("/user/:id",singleUser);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
