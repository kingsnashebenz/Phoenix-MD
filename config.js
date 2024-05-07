const { Sequelize } = require("sequelize");
const fs = require("fs");
if (fs.existsSync("config.env"))
  require("dotenv").config({ path: "./config.env" });

const toBool = (x) => x == "true";

DATABASE_URL = process.env.DATABASE_URL || "./lib/database.db";
let HANDLER = "false";

module.exports = {
  //For Enabling Commands Like AUTO_STATUS_RED Type true For Disenabling Type false
  ANTILINK: toBool(process.env.ANTI_LINK) || true,
  //_________________________________________________________________________________________________________________________________
  LOGS: toBool(process.env.LOGS) || true,
  //_________________________________________________________________________________________________________________________________
  ANTILINK_ACTION: process.env.ANTI_LINK || "kick",
  //_________________________________________________________________________________________________________________________________
  AUTO_REACT: process.env.AUTO_REACT || 'false',
  //_________________________________________________________________________________________________________________________________
  AUDIO_DATA: process.env.AUDIO_DATA || "Phoenix-MD;Abhishek Suresh;https://graph.org/file/8976892f2f615077b48cd.jpg",
  //_________________________________________________________________________________________________________________________________
  AUTO_STATUS_READ: process.env.AUTO_STATUS_READ || 'true',
  //_________________________________________________________________________________________________________________________________
  SESSION_ID: process.env.SESSION_ID || "Astro;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUJCLy9KUmM1eHNldWltWjZMWDhYV3JRWjdENzJmRjYrdStIRjduclZsaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEYrZURZME50d2dXMmJMRjRZbVRPdjQwcER0TkVRb0g2MHZjZ2krK1hUaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvSmRuc1c4SGdVRy9kY01lY1NqZXJabzJGNWUvTWVKN1ZZRVlpb1FCRDBnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJSSG82NUtCeTBzMTVRNFVBR3MvMThQbDAyZHNua3dyVjFZc2dkNThCVVdnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtNeC85bk9aT3NBV3Joc0JWczBqcWtPN1hKUk1qekFmK0dGL2lkbElxbUk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZlcHdPaGRraEFnUEZHMzFpU01vSlVKTU0zU2FYR2lvN1h1RzVma0xqSFE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQU5aYXVwUFZMZkFMcnhNWnc3dlVXcWlvakxQUFY3amJIMVdoT1hEQldVYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK1dBTDFyczRVSmVpWDNSQ3U5WDlEZUt6OWp1MGRBQTBvNGRvNGIwbzBoUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkswMStaVkNtcW1RU0IxbXNkSzBJZlNWTHptRXFMUllqbjRQamN6SW5FdUdQYStSMnhrSmtsUTFkK0VPODhKcXc3RkxMcG1uVHV6bGVxcGlhN2UyOENnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjAxLCJhZHZTZWNyZXRLZXkiOiJURHFOSGZaUEgyc2s0b1VJZ3daQ3gwSXBLUFVEY2ZhZGFOYndOdjBXZnRjPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJ4ZkFCR0ltaFR4T19xM2hNYm4zNXhBIiwicGhvbmVJZCI6ImMyMjkwNjAxLTVhMzgtNDhhZS1hOWQ1LWYwZjIxYzdmMjhkOCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRUXRrOElEdW9GRDhUdk5CRU9DcDNTM3M0SnM9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWVpiTXhPTWQ1QytGWG9yVzBBQzc4MlRZNGdnPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkJXMVBOUExGIiwibWUiOnsiaWQiOiIyNTQ3NDg1MTQ2NzQ6MUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJMYXplbiAxMTIifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ09UYzg0UUdFUHFINkxFR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ild2ZFpHNWplaFR6dm5jb0JmcW9UdXQrdHpGVmNmMWQ1N2ZCV0ZwcjJqUXM9IiwiYWNjb3VudFNpZ25hdHVyZSI6Im5DRzVRL0UvdlRRYkJCVzkxY3hqOVFDalJyTjVPallvVmpyQXBKY3lwYmhma2Y5c05RdkhEczIwQlFrWFByMTJKSkZGU1NqMmkxNkErVERkWDZLOEJBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiIrNUZyTWd3RDF5WU5ibGZmd0FNT1FabXJGTHRXdVIvVWVLY3pFa3NuelBnSjA1Z0pBOTJJQk9WRGdpclFGVjhSN2tocCtKaFF2dHdDOEtpV1JDQmtEdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDc0ODUxNDY3NDoxQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlZyM1dSdVkzb1U4NzUzS0FYNnFFN3JmcmN4VlhIOVhlZTN3VmhhYTlvMEwifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MTUwNzgxNTF9", //Enter Your Session Id Here
  //_________________________________________________________________________________________________________________________________
  SUDO: process.env.SUDO || "254748714674",
  //_________________________________________________________________________________________________________________________________
  SPAM_COUNT: process.env.SPAM_COUNT || "10",
  //_________________________________________________________________________________________________________________________________
  LANG: process.env.LANG || "EN",
  //_________________________________________________________________________________________________________________________________
  HANDLERS: process.env.PREFIX || '^[.]',
  //_________________________________________________________________________________________________________________________________
  RMBG_KEY: process.env.RMBG_KEY || false,
  //_________________________________________________________________________________________________________________________________
  BRANCH: "main",
  //_________________________________________________________________________________________________________________________________
  STICKER_DATA: "🎯‼️ mana SNASHE; king snashe benz ",
  //_________________________________________________________________________________________________________________________________
  WELCOME_MSG: process.env.WELCOME_MSG || "👋 Hello *@user* Im snashe,Welcome To Our Group *@gname*\n*Total Members:* @count\n*Group Description:*\n@gdesc {pp}",
  //_________________________________________________________________________________________________________________________________
  GOODBYE_MSG: process.env.GOODBYE_MSG || "👋 GoodBye *@user* From *@gname*\n*Total Members:* @count {pp}",
  //_________________________________________________________________________________________________________________________________
  DATABASE_URL: DATABASE_URL,
  //_________________________________________________________________________________________________________________________________
  HEROKU_APP_NAME: process.env.king_snashe_benz || " ",
  //_________________________________________________________________________________________________________________________________
  HEROKU_API_KEY: process.env.HEROKU_API_KEY || " ",
  //_________________________________________________________________________________________________________________________________
  OWNER_NAME: process.env.OWNER_NAME || "King snashe Benz",
  //_________________________________________________________________________________________________________________________________
  OWNER_NUMBER: process.env.OWNER_NUMBER || "254748514674",
  //_________________________________________________________________________________________________________________________________
  BOT_NAME: process.env.BOT_NAME || "Phoenix-MD",
  //_________________________________________________________________________________________________________________________________
  WORK_TYPE: process.env.WORK_TYPE || "public",
  //_________________________________________________________________________________________________________________________________
  MENTION_DATA: "Phoenix-MD;919074692450;https://graph.org/file/63942461d4b8d78b360d3.jpg;https://graph.org/file/bb3ac71ec991cef3d5216.mp4",
  //_________________________________________________________________________________________________________________________________
  BASE_URL: "https://abhi-api-bvws.onrender.com/",
  //_________________________________________________________________________________________________________________________________
  //Database
  DATABASE:
    DATABASE_URL === "./lib/database.db"
      ? new Sequelize({
          dialect: "sqlite",
          storage: DATABASE_URL,
          logging: false,
        })
      : new Sequelize(DATABASE_URL, {
          dialect: "postgres",
          ssl: true,
          protocol: "postgres",
          dialectOptions: {
            native: true,
            ssl: { require: true, rejectUnauthorized: false },
          },
          logging: false,
        }),
};
