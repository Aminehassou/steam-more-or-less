// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name1: string;
  playerCount1: number;
  name2: string;
  playerCount2: number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({
    name1: "Dota 2",
    playerCount1: 500,
    name2: "Bioshock",
    playerCount2: 200,
  });
}
