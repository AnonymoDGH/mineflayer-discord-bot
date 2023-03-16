const mineflayer = require("mineflayer");
const colors = require("colors");
const request = require("request");

const options = require("../config.json");
const { webhook } = options;

/**
 * @param {mineflayer.Bot} bot
 */

module.exports = (bot) => {
  bot.on("chat", (username, message) => {
    if (username === bot.username) return;
    if (username === "chat") username = "Discord";
    if (message.includes("http")) return;
    console.log(`[${new Date().toLocaleTimeString().gray}] [${username.brightBlue}] ${message.brightYellow}`);

    var URL = `${webhook}`;
    request.post(URL, {
      json: {
        content: `${message}`,
        username: `${username}`,
        avatar_url: `https://mc-heads.net/head/${username}`,
      },
    });
  });
};
