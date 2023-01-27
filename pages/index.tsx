import { useQuery } from "@tanstack/react-query";
import Capsule from "../components/Capsule";

import { useEffect, useState } from "react";

const fetcher = async (url: string, queryParams: string = "") => {
  console.log("queryParams", queryParams);

  const res = await fetch(`${url}${queryParams}`);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data;
};

export default function Home() {
  const [showPlayerData, setShowPlayerData] = useState<boolean>(false);
  const [queryParams, setQueryParams] = useState<string>("");
  const [leftGame, setLeftGame] = useState<any>({});
  const [rightGame, setRightGame] = useState<any>({});

  const { data, error, isLoading } = useQuery(
    ["startGame"],
    () => {
      return fetcher("/api/game/start");
    },
    {
      cacheTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  const {
    data: nextData,
    error: nextError,
    isLoading: nextIsLoading,
    refetch,
  } = useQuery(
    ["nextGame", queryParams],
    () => {
      return fetcher("/api/game/next", queryParams);
    },
    {
      cacheTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      enabled: !!queryParams,
      onSuccess: (nextGame) => {
        setLeftGame(rightGame);
        setRightGame(nextGame);
      },
    }
  );

  useEffect(() => {
    if (data?.length === 2) {
      setLeftGame(data[0]);
      setRightGame(data[1]);
    }
  }, [data]);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  function onClick() {
    setShowPlayerData(true);
    setTimeout(() => {
      setShowPlayerData(false);
      setQueryParams(`?lastgame=${rightGame.title}`);
    }, 1000);
  }

  return (
    <div>
      <main className="grid grid-cols-11 text-center text-3xl text-white h-screen place-items-center">
        <div className="col-span-5">
          <Capsule
            name={leftGame.title}
            playerCount={leftGame.player_count}
            imageURL="dota2capsule.jpg"
            showPlayerData={true}
            onClick={onClick}
          />
        </div>
        <div className="col-span-1 h-full w-0.5 bg-white"></div>
        <div className="col-span-5">
          <Capsule
            name={rightGame.title}
            playerCount={rightGame.player_count}
            imageURL="bioshockcapsule.jpg"
            showPlayerData={showPlayerData}
            onClick={onClick}
          />
        </div>
      </main>
    </div>
  );
}
