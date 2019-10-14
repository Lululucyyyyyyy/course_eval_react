const express = require('express');
const router = express.Router();
const User = require('../models/Stat');

router.post('/getAll', function (req, res, next) {
  console.log('getting data');
  Stats.findAll()
  .then((data) => {
    console.log(data);
    res.send(data)
  })
});

router.post('/highestacc', function (req, res, next) {
  console.log('getting acc');
  Stats.max()
  .then((max) => {
    console.log(max);
    Stats.findOne({ where: {accuracy: max } })
    .then(data=>{
      res.send(data);
    });
  });
});

router.post('/lowestlat', function (req, res, next) {
  console.log('getting lat');
  Stats.min()
  .then((min) => {
    console.log(min);
    Stats.findOne({ where: {latency: min } })
    .then(data=>{
      res.send(data);
    });
  });
});

module.exports = router;