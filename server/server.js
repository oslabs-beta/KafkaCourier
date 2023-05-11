const express = require('express');
const app = express();
const path = require('path');
const { Kafka } = require('kafkajs')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;

//serve static files
app.use(express.static(path.join(__dirname, './src')));

//catch-all route for errors 
app.get('*', (req, res) => {
  res.sendStatus(404);
});


// start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});