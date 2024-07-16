const express = require('express');
const bookingsRouter = express.Router();
const { rooms } = require('./rooms');

let bookings = [];

bookingsRouter.post('/', (req, res) => {
  const { customerName, date, startTime, endTime, roomId } = req.body;

  const room = rooms.find(room => room.id === roomId);
  if (!room) {
    return res.status(404).send({ error: 'Room not found' });
  }

  const isBooked = room.bookings.some(booking => 
    booking.date === date && (
      (startTime >= booking.startTime && startTime < booking.endTime) ||
      (endTime > booking.startTime && endTime <= booking.endTime)
    )
  );

  if (isBooked) {
    return res.status(400).send({ error: 'Room is already booked for the selected time' });
  }

  const newBooking = {
    id: bookings.length + 1,
    customerName,
    date,
    startTime,
    endTime,
    roomId
  };
  bookings.push(newBooking);
  room.bookings.push(newBooking);

  res.status(201).send(newBooking);
});

bookingsRouter.get('/', (req, res) => {
  const result = rooms.map(room => ({
    roomName: room.name,
    bookings: room.bookings
  }));
  res.send(result);
});

module.exports = { bookingsRouter, bookings };
