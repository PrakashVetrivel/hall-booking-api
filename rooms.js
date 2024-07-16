const express = require('express');
const roomsRouter = express.Router();

let rooms = [];

roomsRouter.post('/', (req, res) => {
  const { name, seats, amenities, pricePerHour } = req.body;
  const newRoom = {
    id: rooms.length + 1,
    name,
    seats,
    amenities,
    pricePerHour,
    bookings: []
  };
  rooms.push(newRoom);
  res.status(201).send(newRoom);
});

roomsRouter.get('/', (req, res) => {
  res.send(rooms);
});

module.exports = { roomsRouter, rooms };
