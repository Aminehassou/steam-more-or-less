// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import games from "../../json/games.json";
type Data = {
  title: string;
  player_count: number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let game: Data = games[Math.floor(Math.random() * games.length)];

  res.status(200).json(game);
}
