import { Client } from "discord.js";
import { token } from "./settings";
import wishes from "./wishes.json";
import symbols from "./symbols.json";
const client = new Client();

const wishesWithEmoji = Object.entries(wishes)
  .map(([number, wishCode]) => ({
    [number]: [...wishCode]
      .map((code, i) => {
        if (code === " ") {
          return ":redbrain:";
        }
        const index = parseInt(code, 16);
        const symbol = symbols[index];
        const ending = i === 4 || i === 9 || i === 14 ? "\n" : "";
        return `:LW_${symbol}:${ending}`;
      })
      .join(""),
  }))
  .reduce<{ [wishNumber: string]: string }>((a, b) => ({ ...a, ...b }), {});

client.on("ready", () => console.log("Ready!"));

client.on("message", (msg) => {
  if (msg.author.bot) return;

  if (msg.content.startsWith("*wish")) {
    const arg = msg.content.split(" ")[1];
    if (!arg) {
      msg.reply(
        "Usage: *wish <number>, where <number> is between 1 and 15, inclusive."
      );
    }
    const number = Number(arg);
    if (isNaN(number)) {
      msg.reply("That is not a number.");
    }
    if (number < 1 || number > 15) {
      msg.reply("The wish number must be between 1 and 15, inclusive.");
    }
    msg.reply(wishesWithEmoji[number]);
  }
});

client.login(token);