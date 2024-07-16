const express = require('express');
const bodyParser = require('body-parser');
const { roomsRouter } = require('./rooms');
const { bookingsRouter } = require('./bookings');
const { customersRouter } = require('./customers');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).send(`
        <div style="background-color: purple; color: white;">
            <h1>Hall-Booking</h1>
        </div>
    `);
});

app.use('/rooms', roomsRouter);
app.use('/bookings', bookingsRouter);
app.use('/customers', customersRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
