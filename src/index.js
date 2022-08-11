const express = require("express");
const router = express.Router();
const { createTransaction, getExchangeRange, getMinimalExchangeAmount } = require("./exchange_client");

const port = process.env.PORT || 10500;
const app = express();

router.get("/health", (req, res) => {
  return res.status(200).json({
    health: "health",
    url: req.url
  });
});

router.post("/createExchange", async (req, res) => {
  try {
    const { body } = req;
    const result = await createTransaction(body.fromCurrency, body.toCurrency, body.fromNetwork, body.toNetwork, body.fromAAmount, body.address);
    return res.status(200).json({ result });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.use(express.json());
app.use("/swap", router);

app.listen(port, () => console.log(`Listening on ${port}`));
