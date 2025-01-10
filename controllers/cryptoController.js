import { CryptoDataModel } from "../models/crypto.js";

export const getStats = async (req, res) => {
  const { coin } = req.query;

  const validCoins = ["bitcoin", "matic-network", "ethereum"];
  if (!validCoins.includes(coin)) {
    return res.status(400).json({
      error:
        "Invalid coin parameter. Use 'bitcoin', 'matic-network', or 'ethereum'.",
    });
  }

  try {
    const cryptoData = await CryptoDataModel.findOne({ name: coin })
      .sort({ createdAt: -1 })
      .exec();

    if (!cryptoData) {
      return res
        .status(404)
        .json({ error: "Data not found for the requested coin." });
    }

    return res.json({
      price: cryptoData.price,
      marketCap: cryptoData.marketCap,
      "24hChange": cryptoData.change24h,
    });
  } catch (error) {
    console.error("Error fetching crypto data:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getDeviation = async (req, res) => {
  const { coin } = req.query;

  const validCoins = ["bitcoin", "matic-network", "ethereum"];
  if (!validCoins.includes(coin)) {
    return res.status(400).json({ error: "Invalid coin parameter." });
  }

  try {
    const records = await CryptoDataModel.find({ name: coin })
      .sort({ createdAt: -1 })
      .limit(100);

    if (records.length === 0) {
      return res
        .status(404)
        .json({ error: "No records found for the requested coin." });
    }

    const prices = records.map((record) => record.price);

    const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;

    console.log("Mean:", mean);

    const variance =
      prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) /
      prices.length;

    console.log("Variance:", variance);

    const standardDeviation = Math.sqrt(variance);

    console.log("Standard deviation:", standardDeviation);

    res.json({ deviation: parseFloat(standardDeviation.toFixed(2)) });
  } catch (error) {
    console.error("Error calculating standard deviation:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
