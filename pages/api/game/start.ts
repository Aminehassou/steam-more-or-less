import type { NextApiRequest, NextApiResponse } from "next";
import games from "../../../json/games.json";
import { getTwoRandomIndexes } from "../../../utils";
type Data = {
  title: string;
  player_count: number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[]>
) {
  console.log(req.query);
  let gameIndexes: number[] = getTwoRandomIndexes(games.length);
  let game: Data[] = [games[gameIndexes[0]], games[gameIndexes[1]]];
  res.status(200).json(game);
}
