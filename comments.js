// Create web server

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

// Create event handler for comments service
app.post('/events', async (req, res) => {
    const { type, data } = req.body;

    if (type === 'CommentCreated') {
        // Check if comment contains the word 'orange'
        const status = data.content.includes('orange') ? 'rejected' : 'approved';

        // Emit event to event bus
        await axios.post('http://localhost:4005/events', {
            type: 'CommentModerated',
            data: {
                id: data.id,
                postId: data.postId,
                status,
                content: data.content
            }
        });
    }

    res.send({});
});

app.listen(4003, () => {
    console.log('Listening on 4003');
});