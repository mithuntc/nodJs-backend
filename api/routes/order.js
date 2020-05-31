const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const orders = require("../models/order");

router.get("/", (req, res, next) => {
  orders.find().exec().then(docs => {
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
  const order = new orders({
    _id: new mongoose.Types.ObjectId(),
    order_type: req.body.order_type,
    order_value: req.body.order_value,
  });
  order
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
  res.status(201).json({
    message: "handle POST request to /orders",
    createrProduct: order,
  });
});

router.get("/:orderId", (req, res, next) => {
  const id = req.params.orderId;
  Order.findById(id)
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

router.patch("/:orderId", (req, res, next) => {
  const id = req.params.orderId
  const updateOps = {};
  for (const ops of req.body){
    updateOps[ops.propName] = ops.value;
  }
  Order.update( {_id: id}, { $set: updateOps} ).exec().then( result => {
    console.log(res);
    res.status(200).json(result)
  }).catch( err => {
    console.log(err);
    res.status(500).json({
      error: err
    })
  })
});
router.delete("/:orderId", (req, res, next) => {
  const id = req.params.orderId;
  Order.remove({
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
