import { Client } from "discord.js";
import moment from "moment";
import { QueryFn } from "../../util";

// THIS IS A WORK IN PROGRESS AND IS NOT LOADED INTO THE BOT CURRENTLY

const CREATE_MUTES_TABLE = `
CREATE TABLE IF NOT EXISTS mutes (
    id          SERIAL PRIMARY KEY,
    user_id     integer NOT NULL,
    end_time    integer NOT NULL,
    roles       int[] NOT NULL,
);
`;

type MuteResult = {
  user_id: number;
  roles: number[];
  end_time: number;
};

async function getCurrentMutes(query: QueryFn) {
  return query<MuteResult>(
    "SELECT user_id, roles, end_time FROM mutes WHERE end_time >= $1",
    [moment().unix()]
  );
}

async function unmute(client: Client, mute: MuteResult) {}

export async function init(client: Client, query: QueryFn) {
  await query(CREATE_MUTES_TABLE);

  const current_mutes = await getCurrentMutes(query);
  for (const mute of current_mutes.rows) {
    setTimeout(async () => {
      await unmute(client, mute);
    }, moment().diff(mute.end_time)).unref();
  }
}
