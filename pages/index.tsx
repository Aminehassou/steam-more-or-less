import useSWRImmutable from "swr/immutable";
import Capsule from "../components/Capsule";
import Button from "../components/Button";
import { Color } from "../utils";
import { useState } from "react";

const fetcher = async (url: string, queryParams: string = "") => {
  console.log(`${url}${queryParams}`);
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

  const { data, error, isLoading } = useSWRImmutable(
    ["/api/game/start"],
    ([url]) => fetcher(url)
  );
  const {
    data: nextData,
    error: nextError,
    isLoading: nextIsLoading,
  } = useSWRImmutable(["/api/game/next", queryParams], ([url, queryParams]) =>
    fetcher(url, queryParams)
  );
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  function onClick() {
    setShowPlayerData(true);
    setTimeout(() => {
      setShowPlayerData(false);
    }, 1000);
    setQueryParams(`?lastgame=${data[1].title}`);
  }

  return (
    <div>
      <main className="grid grid-cols-11 text-center text-3xl text-white h-screen place-items-center">
        <div className="col-span-5">
          <Capsule
            name={data[0].title}
            playerCount={data[0].player_count}
            imageURL="dota2capsule.jpg"
            showPlayerData={true}
            onClick={onClick}
          />
        </div>
        <div className="col-span-1 h-full w-0.5 bg-white"></div>
        <div className="col-span-5">
          <Capsule
            name={data[1].title}
            playerCount={data[1].player_count}
            imageURL="bioshockcapsule.jpg"
            showPlayerData={showPlayerData}
            onClick={onClick}
          />
        </div>
      </main>
    </div>
  );
}
