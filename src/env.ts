import { config } from "dotenv"

config();
const env = {
  dbHost: process.env.DB_HOST,
  nftApiKey: process.env.NFT_STORAGE_API_KEY,
  port: process.env.PORT,
  dbDatabase: process.env.DB_DATABASE,
  jwtSecret: process.env.JWT_SECRET,
  clientUrl: process.env.CLIENT_URL,
}

export default env;
