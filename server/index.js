const express = require('express');
const path = require('path');
const cors = require('cors');

const { getSchedule, createSchedule, deleteSchedule, updateSchedule} = require('./controller');
const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static('client'))


app.get('/api/schedule', getSchedule);
app.post('/api/schedule', createSchedule);
app.delete('/api/schedule/:id', deleteSchedule);
app.put('/api/schedule/:id', updateSchedule);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'))
})

const PORT = process.env.PORT || 4005

app.listen(PORT, () => { console.log(`Listening on ${PORT}`)})