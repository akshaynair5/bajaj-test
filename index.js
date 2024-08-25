const express = require('express');
const cors = require('cors');
const functions = require("firebase-functions")
const app = express();

app.use(express.json());
app.use(cors());

const PORT = 3000;

app.post('/bfhl', (req, res) => {
    const data = req.body;
    const { user_id, email, roll_number, data_array } = data;

    const numbers = data_array.filter(item => !isNaN(item));
    const alphabets = data_array.filter(item => isNaN(item));

    const lowercaseAlphabets = alphabets.filter(item => /^[a-z]$/.test(item));
    const highestLowercaseAlphabet = lowercaseAlphabets.length > 0 ? [lowercaseAlphabets.sort().pop()] : [];

    res.json({
        status: "success",
        user_id: user_id,
        college_email: email,
        college_roll_number: roll_number,
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet
    });
});

app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});