const mineflayer = require("mineflayer");
const fs = require("node:fs");
const path = require("node:path");

const pathfinder = require("mineflayer-pathfinder").pathfinder;
const collectBlock = require("mineflayer-collectblock").plugin;
const pvp = require("mineflayer-pvp").plugin;

const { username, address, port, version, auth, showCoordinates } = require(".env.example");

function createBot() {
  function injectModules(bot) {
    const MODULES_DIRECTORY = path.join(__dirname, "modules");
    const modules = fs
      .readdirSync(MODULES_DIRECTORY)
      .filter((x) => x.endsWith(".js"))
      .map((pluginName) => require(path.join(MODULES_DIRECTORY, pluginName)));

    console.log(`Loaded \x1b[32m${modules.length}\x1b[0m bot modules`);

    bot.loadPlugins(modules);
  }

  const bot = mineflayer.createBot({
    username: "IfuryTrm",
    auth: "offline",
    host: "UHCustomUnivers.exaroton.me",
    port: "45971",
    version: version,
    logErrors: false,
    hideErrors: true,
    physicsEnabled: true,
  });

  bot.on('spawn', () => {
    bot.chat('/login kevin12')
  });

  
  bot.status = {
    isGuarding: false,
    isTotem: false,
    showCoordinates: showCoordinates,
  };

  injectModules(bot);

  bot.loadPlugin(collectBlock);
  bot.loadPlugin(pathfinder);
  bot.loadPlugin(pvp);

  bot.on("end", () => {
    console.log("\x1b[31mThe bot has ended. Reconnecting... \x1b[0m");
    setTimeout(createBot, 5000);
  });

  bot.on("error", (err) => {
    console.error(err.message);
  });

  return bot;
}

module.exports = createBot;
