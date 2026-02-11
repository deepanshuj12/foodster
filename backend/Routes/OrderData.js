const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

const setCorsHeaders = (res) => {
  res.setHeader("Access-Control-Allow-Origin", "https://foodster-stxh.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
};

router.options("/orders", (req, res) => {
  setCorsHeaders(res);
  res.status(200).end();
});

router.options("/myorders", (req, res) => {
  setCorsHeaders(res);
  res.status(200).end();
});

router.post("/orders", async (req, res) => {
  setCorsHeaders(res);

  let data = req.body.order_data;
  data.splice(0, 0, { Order_date: req.body.order_date });

  let eId = await Order.findOne({ email: req.body.email });

  if (eId === null) {
    try {
      await Order.create({
        email: req.body.email,
        order_data: [data]
      }).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("server error", error.message);
    }
  } else {
    try {
      let existingOrderData = eId.order_data;
      existingOrderData.push(data);
      await Order.updateOne(
        { email: req.body.email },
        { $set: { order_data: existingOrderData } }
      ).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      res.status(500).send("server error", error.message);
    }
  }
});

router.post("/myorders", async (req, res) => {
  setCorsHeaders(res);

  try {
    let myData = await Order.findOne({ email: req.body.email });
    res.json({ orderData: myData });
  } catch (error) {
    res.status(500).send("server error", error.message);
  }
});

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const Order = require('../models/Orders');

// router.post('/orders', async (req, res) => {
//     let data = req.body.order_data;

//     data.splice(0, 0, { Order_date: req.body.order_date });

//     let eId = await Order.findOne({ 'email': req.body.email });

//     if (eId === null) {
//         try {
//             await Order.create({
//                 email: req.body.email,
//                 order_data: [data] 
//             }).then(() => {
//                 res.json({ success: true });
//             });
//         } catch (error) {
//             console.log(error.message);
//             res.status(500).send("server error", error.message);
//         }
//     } else {
//         try {

//             let existingOrderData = eId.order_data;
//             existingOrderData.push(data);
//             await Order.updateOne(
//                 { email: req.body.email },
//                 { $set: { order_data: existingOrderData } }
//             ).then(() => {
//                 res.json({ success: true });
//             });
//         } catch (error) {
//             res.status(500).send("server error", error.message);
//         }
//     }
// });

// router.post('/myorders', async (req, res) => {
//     try {
//         let myData = await Order.findOne({ 'email': req.body.email });
//         res.json({ orderData: myData });
//     } catch (error) {
//         res.status(500).send("server error", error.message);
//     }
// });

// module.exports = router;


