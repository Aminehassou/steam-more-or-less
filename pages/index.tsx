import useSWR from "swr";
import Capsule from "../components/Capsule";
import Button from "../components/Button";
import { color } from "../utils";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data;
};

export default function Home() {
  const { data, error, isLoading } = useSWR("/api/game", fetcher);
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
          />
        </div>
        <div className="col-span-1">
          <img src="vr3.png" className="h-screen" alt="" />
        </div>
        <div className="col-span-5">
          <Capsule
            name={data.name2}
            playerCount={data.playerCount2}
            imageURL="bioshockcapsule.jpg"
          />
          <Button text={"Higher"} color={color.Red}></Button>
          <Button text={"Lower"} color={color.Green}></Button>
        </div>
      </main>
    </div>
  );
}
