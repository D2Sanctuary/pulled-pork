import { Client, Message } from "discord.js";
import { QueryFn } from "../util";

type MessageHandler = (msg: Message) => Promise<void>;

interface Module {
  init: (client: Client, query: QueryFn) => Promise<MessageHandler>;
}

const modules: Module[] = [require("./wish")];

export async function init(client: Client, query: QueryFn) {
  const msgHandlers: MessageHandler[] = [];

  for (const module of modules) {
    msgHandlers.push(await module.init(client, query));
  }

  return (msg: Message) => {
    return Promise.all(msgHandlers.map((handler) => handler(msg)));
  };
}
