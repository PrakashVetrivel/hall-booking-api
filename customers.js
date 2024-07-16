const express = require('express');
const customersRouter = express.Router();
const { bookings } = require('./bookings');
const { rooms } = require('./rooms');

customersRouter.get('/', (req, res) => {
  const customers = bookings.map(booking => ({
    customerName: booking.customerName,
    roomName: rooms.find(room => room.id === booking.roomId).name,
    date: booking.date,
    startTime: booking.startTime,
    endTime: booking.endTime
  }));
  res.send(customers);
});

customersRouter.get('/:customerName', (req, res) => {
  const { customerName } = req.params;
  const customerBookings = bookings.filter(booking => booking.customerName === customerName).map(booking => ({
    customerName: booking.customerName,
    roomName: rooms.find(room => room.id === booking.roomId).name,
    date: booking.date,
    startTime: booking.startTime,
    endTime: booking.endTime,
    bookingId: booking.id,
    bookingDate: booking.date,
    bookingStatus: 'Booked'
  }));
  res.send(customerBookings);
});

module.exports = { customersRouter };
