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
