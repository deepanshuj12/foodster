const express = require("express");
const router = express.Router();

// Preflight handler
router.options("/CardData", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "https://foodster-stxh.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.status(200).end();
});

router.post("/CardData", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "https://foodster-stxh.vercel.app");

  try {
    res.send([global.food_items, global.food_category]);
  } catch (error) {
    console.error(error.message);
    res.send("server error");
  }
});

module.exports = router;


// const express = require("express");
// const router = express.Router();

// router.post("/CardData", (req, res) => {
//   try {
//     res.send([global.food_items,global.food_category]);
//   } catch (error) {
//     console.error(error.message);
//     res.send("server error");
//   }
// });

// module.exports = router;
