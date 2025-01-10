# Cryptocurrency Data Fetcher and API

## Overview
This project consists of three main tasks:

1. **Background Job**: A scheduled job fetches cryptocurrency data (current price in USD, market cap in USD, and 24-hour price change) for Bitcoin, Matic, and Ethereum and stores it in a database every 2 hours.

2. **API `/stats`**: Returns the latest data for a requested cryptocurrency.

3. **API `/deviation`**: Returns the standard deviation of the price of the requested cryptocurrency based on the last 100 records.

---

## Project Structure

```
project-root
├── config
│   └── config.env      # Environment variables configuration
├── controllers
│   └── cryptoController.js # API controllers implementation
├── DB
│   └── connect.js      # MongoDB connection setup
├── models
│   └── crypto.js       # Mongoose schema for cryptocurrency data
├── jobs
│   └── cryptojob.js    # Background job implementation
├── utils
    |── fetchdata.js    # Utility function to fetch cryptocurrency data
    |── savedata.js     # Utility function to save cryptocurrency data
├── gitignore           
├── index.js            # Entry point of the application
├── package.json        # Project dependencies and scripts
└── README.md           # Project documentation
```

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the project config folder with the reference of the txt file provided in the config folder.

#### Start the Server
```bash
npm start
```

#### Run the Background Job
The background job runs automatically every 2 hours, but you can also trigger it manually:
```bash
node jobs/cryptojob.js
```

---

## API Endpoints

### 1. **Get Cryptocurrency Stats**
**Endpoint**: `/stats`

**Method**: `GET`

**Query Parameters**:
- `coin` (required): Accepts `bitcoin`, `matic-network`, or `ethereum`.

**Response**:
```json
{
  "price": 26784.21,
  "marketCap": 521987654,
  "24hChange": -1.23
}
```

**Errors**:
- `400`: Invalid coin parameter.
- `404`: Data not found for the requested coin.

### 2. **Get Price Standard Deviation**
**Endpoint**: `/deviation`

**Method**: `GET`

**Query Parameters**:
- `coin` (required): Accepts `bitcoin`, `matic-network`, or `ethereum`.

**Response**:
```json
{
  "deviation": 123.45
}
```

**Errors**:
- `400`: Invalid coin parameter.
- `404`: No records found for the requested coin.

---

## Implementation Details

### Task 1: Background Job
- Fetches cryptocurrency data every 2 hours from [CoinGecko API](https://www.coingecko.com/en/api).
- Data fetched includes:
  - Current price in USD
  - Market cap in USD
  - 24-hour price change
- Stores data in a MongoDB database.

**File**: `jobs/cryptojob.js`

### Task 2: API `/stats`
- Fetches the latest record for the requested cryptocurrency from the database.
- Returns price, market cap, and 24-hour price change.

**File**: `controllers/cryptoController.js`

### Task 3: API `/deviation`
- Retrieves the last 100 price records for the requested cryptocurrency.
- Calculates the standard deviation of the prices and returns the result.

**File**: `controllers/cryptoController.js`

---

## Dependencies

- **Node.js**: Backend runtime environment
- **Express.js**: Framework for building APIs
- **Mongoose**: MongoDB ORM
- **Node-Cron**: Task scheduling for the background job
- **Axios**: HTTP client for fetching data from external APIs

---
