import type { NextApiRequest, NextApiResponse } from "next";
import games from "../../../json/games.json";
import { getOneRandomIndex } from "../../../utils";
type Data = {
  title: string;
  player_count: number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let gameIndex: number = getOneRandomIndex(games.length);
  let game: Data = games[gameIndex];
  while (req.query.lastgame === game.title) {
    gameIndex = getOneRandomIndex(games.length);
    game = games[gameIndex];
  }
  console.log(game);
  res.status(200).json(game);
}
