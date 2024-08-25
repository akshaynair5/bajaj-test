const express = require('express');
const functions = require("firebase-functions")
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.post('/bfhl', (req, res) => {

    const { full_name, dob } = req.body;
    
    if (!full_name || !dob) {

        return res.status(400).json({
            user_id: null,
            is_success: false
        });
    }

    const formattedDob = dob.split('-').join('');
    const userId = `${full_name.toLowerCase().replace(' ', '_')}_${formattedDob}`;

    res.json({
        user_id: userId,
        is_success: true
    });
});

app.get('/bfhl', (req, res) => {

    res.json({
        operation_code: 1
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

exports.api = functions.https.onRequest(app)