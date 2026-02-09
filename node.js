const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Connection to Cloud MongoDB Atlas 
// Your password 'Albin#123@' has been encoded for the URL
const dbURI = "mongodb+srv://albinjo2025_db_user:Albin%23123%40@cluster0.3blcord.mongodb.net/portfolioDB?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(dbURI)
    .then(() => console.log("Cloud MongoDB Connected! ✅"))
    .catch(err => console.log("Connection Error ❌: ", err));

// 2. Define the Message Schema
const MessageSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now }
});
const Message = mongoose.model('Message', MessageSchema);

// 3. The Route to receive form data from your website
app.post('/api/contact', async (req, res) => {
    try {
        const newMessage = new Message({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        });
        await newMessage.save();
        res.status(200).send({ status: "Success", msg: "Saved to Cloud!" });
    } catch (err) {
        res.status(500).send({ status: "Error", error: err });
    }
});

// 4. Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
