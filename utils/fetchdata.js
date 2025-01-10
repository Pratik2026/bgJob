import axios from "axios";

async function fetchCryptoData() {
  const coinIds = ["bitcoin", "matic-network", "ethereum"];
  const options = {
    method: "GET",
    url: `${process.env.COINGECKO_API_URL}`,
    params: {
      ids: coinIds.join(","),
      vs_currencies: "usd",
      include_market_cap: "true",
      include_24hr_change: "true",
    },
    headers: {
      accept: "application/json",
      "x-cg-pro-api-key": process.env.COINGECKO_API_KEY,
    },
  };

  try {
    const response = await axios.request(options);
    console.log("Fetched crypto data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return null;
  }
}

export default fetchCryptoData;
