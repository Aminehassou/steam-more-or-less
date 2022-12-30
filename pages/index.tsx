import useSWR from "swr";
import Capsule from "../components/Capsule";
import Button from "../components/Button";
import { Color } from "../utils";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data;
};

export default function Home() {
  const { data, error, isLoading, mutate } = useSWR("/api/game", fetcher);
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <div>
      <main className="grid grid-cols-11 text-center text-3xl text-white h-screen place-items-center">
        <div className="col-span-5">
          <Capsule
            name={data.name1}
            playerCount={data.playerCount1}
            imageURL="dota2capsule.jpg"
            showPlayerData={true}
          />
        </div>
        <div className="col-span-1 h-full w-0.5 bg-white"></div>
        <div className="col-span-5 mt-3">
          <Capsule
            name={data.name2}
            playerCount={data.playerCount2}
            imageURL="bioshockcapsule.jpg"
            showPlayerData={false}
          />

          <Button
            text={"Higher"}
            color={Color.Red}
            mutate={mutate}
            data={data}
          ></Button>
          <Button
            text={"Lower"}
            color={Color.Green}
            mutate={mutate}
            data={data}
          ></Button>
        </div>
      </main>
    </div>
  );
}
