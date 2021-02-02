import { Client } from "discord.js";
import { init } from "./modules";
import { query } from "./util";

export default function runBot() {
  const client = new Client();

  client.on("ready", async () => {
    const handler = await init(client, query);
    client.on("message", async (msg) => {
      if (msg.author.bot) return;
      await handler(msg);
    });
    console.log("[BOT] Ready!");
  });

  console.log("[BOT] Initializing...");

  client.login(process.env.DISCORD_TOKEN);
}
