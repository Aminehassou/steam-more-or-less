import useSWRImmutable from "swr/immutable";
import Capsule from "../components/Capsule";
import Button from "../components/Button";
import { Color } from "../utils";
import { useState } from "react";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data;
};

export default function Home() {
  const { data, error, isLoading, mutate } = useSWRImmutable(
    "/api/game",
    fetcher
  );
  const [showPlayerData, setShowPlayerData] = useState<boolean>(false);
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  function onClick() {
    mutate({ ...data });
    setShowPlayerData(true);
    setTimeout(() => {
      setShowPlayerData(false);
    }, 1000);
  }

  return (
    <div>
      <main className="grid grid-cols-11 text-center text-3xl text-white h-screen place-items-center">
        <div className="col-span-5">
          <Capsule
            name={data.title}
            playerCount={data.player_count}
            imageURL="dota2capsule.jpg"
            showPlayerData={true}
          />
        </div>
        <div className="col-span-1 h-full w-0.5 bg-white"></div>
        <div className="col-span-5">
          <Capsule
            name={data.title}
            playerCount={data.player_count}
            imageURL="bioshockcapsule.jpg"
            showPlayerData={showPlayerData}
          />
          {!showPlayerData ? (
            <>
              <Button
                text={"Higher"}
                color={Color.Red}
                onClick={onClick}
              ></Button>
              <Button
                text={"Lower"}
                color={Color.Green}
                onClick={onClick}
              ></Button>
            </>
          ) : (
            ""
          )}
        </div>
      </main>
    </div>
  );
}
