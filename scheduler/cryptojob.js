import cron from "node-cron";
import fetchCryptoData from "../utils/fetchdata.js";
import saveCryptoData from "../utils/savedata.js";

function startCryptoJob() {
  cron.schedule("0 */2 * * *", async () => {
    console.log("Running background job...");
    const cryptoData = await fetchCryptoData();
    if (cryptoData) {
      await saveCryptoData(cryptoData);
    }
  });
  console.log("Crypto job scheduled.");
}

export default startCryptoJob;
