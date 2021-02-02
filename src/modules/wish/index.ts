import wishes from "./wishes.json";
import symbols from "./symbols.json";
import { Client, Message } from "discord.js";

let wishesWithEmoji: { [wishNumber: string]: string } = {};

export async function init(client: Client) {
  wishesWithEmoji = Object.entries(wishes)
    .map(([number, wishCode]) => ({
      [number]: [...wishCode]
        .map((code, i) => {
          const ending = i === 4 || i === 9 || i === 14 ? "\n" : "";
          if (code === " ") {
            return `${client.emojis.cache.find(
              (emoji) => emoji.name === "redbrain"
            )}${ending}`;
          }
          const index = parseInt(code, 16);
          const symbol = symbols[index];
          return `${client.emojis.cache.find(
            (emoji) => emoji.name === `LW_${symbol}`
          )}${ending}`;
        })
        .join(""),
    }))
    .reduce<{ [wishNumber: string]: string }>((a, b) => ({ ...a, ...b }), {});

  return async (msg: Message) => {
    if (msg.content.startsWith("*wish")) {
      const arg = msg.content.split(" ")[1];
      if (!arg) {
        await msg.reply(
          "Usage: *wish <number>, where <number> is between 1 and 15, inclusive."
        );
      }
      const number = Number(arg);
      if (isNaN(number)) {
        await msg.reply("That is not a number.");
      }
      if (number < 1 || number > 15) {
        await msg.reply("The wish number must be between 1 and 15, inclusive.");
      }
      await msg.channel.send(wishesWithEmoji[number]);
    }
  };
}
