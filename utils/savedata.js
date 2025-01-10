import {CryptoDataModel} from "../models/crypto.js";

async function saveCryptoData(data) {
  for (const [coin, details] of Object.entries(data)) {
    const crypto = new CryptoDataModel({
      name: coin,
      price: details.usd,
      marketCap: details.usd_market_cap,
      change24h: details.usd_24h_change,
    });
    await crypto.save();
    console.log(`Saved data for ${coin}`);
  }
}

export default saveCryptoData;
