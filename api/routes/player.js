const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Player = require("../models/players");

router.get("/", (req, res, next) => {
    Player.find().exec().then(docs => {
    // if (docs.length >= 0){
      // console.log(docs);
      res.status(200).json(docs);
    // } else {
      // res.status(404).json({
      //   message: "Data is empty"
      // });
    }).catch( err => {
    console.log(err);
    res.status(500).json({
      errror: err
    });
  });
});
router.post("/", (req, res, next) => {
  const player = new Player({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    address: req.body.address,
    team: req.body.team,
    salary: req.body.salary
  });
  player
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
  res.status(201).json({
    message: "handle POST request to /players",
    createrPlayer: player,
  });
});

router.get("/:playerId", (req, res, next) => {
  const id = req.params.playerId;
  Player.findById(id)
    .exec()
    .then((doc) => {
      console.log("from database", doc);
      res.status(200).json(doc);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:playerId", (req, res, next) => {
  const id = req.params.playerId
  
  Player.update( {_id: id}, { $set: req.body} ).exec().then( result => {
    console.log(res);
    res.status(200).json(result)
  }).catch( err => {
    console.log(err);
    res.status(500).json({
      error: err
    })
  })
});
router.delete("/:playerId", (req, res, next) => {
  const id = req.params.playerId;
  Player.remove({
    _id: id
  }).exec().then(result => {
    res.status(200).json(result)
  }).catch(error => {
    res.status(500).json({
      error: err
    })
  });

});

module.exports = router;
