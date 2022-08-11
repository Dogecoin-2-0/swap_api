const { default: axios } = require("axios");
const { CHANGENOW_API_KEY } = require("./env");

const changeNowClient = axios.create({
  baseURL: "https://api.changenow.io/v2",
  headers: { "x-changenow-api-key": CHANGENOW_API_KEY }
});

function createTransaction(fromCurrency, toCurrency, fromNetwork, toNetwork, fromAmount, address, flow = "standard") {
  return new Promise((resolve, reject) => {
    changeNowClient
      .post("/exchange", {
        fromCurrency,
        toCurrency,
        fromNetwork,
        toNetwork,
        fromAmount,
        address,
        flow
      })
      .then((res) => res.data)
      .then(resolve)
      .catch(reject);
  });
}

function getExchangeRange(fromCurrency, toCurrency, fromNetwork, toNetwork, flow = "standard") {
  return new Promise((resolve, reject) => {
    changeNowClient
      .get(`/exchange/range?fromCurrency=${fromCurrency}&toCurrency=${toCurrency}&fromNetwork=${fromNetwork}&toNetwork=${toNetwork}&flow=${flow}`)
      .then((res) => res.data)
      .then(resolve)
      .catch(reject);
  });
}

function getMinimalExchangeAmount(fromCurrency, toCurrency, fromNetwork, toNetwork, flow = "standard") {
  return new Promise((resolve, reject) => {
    changeNowClient
      .get(
        `/exchange/min-amount?fromCurrency=${fromCurrency}&toCurrency=${toCurrency}&fromNetwork=${fromNetwork}&toNetwork=${toNetwork}&flow=${flow}`
      )
      .then((res) => res.data)
      .then(resolve)
      .catch(reject);
  });
}

module.exports = { createTransaction, getExchangeRange, getMinimalExchangeAmount };
