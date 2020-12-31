import { Client } from "discord.js";
import { token } from "./settings";
import { init } from "./modules";
const client = new Client();

client.on("ready", () => {
  init(client);
});

client.on("message", (msg) => {
  if (msg.author.bot) return;
});

client.login(token);
