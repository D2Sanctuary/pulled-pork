import { Client, Message } from "discord.js";

interface Module {
  init: (client: Client) => (msg: Message) => void;
}

const modules: Module[] = [require("./wish")];

export function init(client: Client) {
  const msgHandlers: ((msg: Message) => void)[] = [];

  for (const module of modules) {
    msgHandlers.push(module.init(client));
  }

  return (msg: Message) => {
    for (const handler of msgHandlers) {
      handler(msg);
    }
  };
}
