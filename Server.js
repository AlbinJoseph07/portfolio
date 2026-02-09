const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Connection to your XAMPP MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      
    password: '',      // Keep empty for default XAMPP
    database: 'albin_portfolio'
});

db.connect(err => {
    if (err) return console.error("Database connection failed: " + err.message);
    console.log("MySQL Connected!");
});

// 2. The Route to receive form data
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    const sql = "INSERT INTO messages (full_name, email, user_message) VALUES (?, ?, ?)";
    
    db.query(sql, [name, email, message], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).send({ status: "Success", message: "Message saved!" });
    });
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
