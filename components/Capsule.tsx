import CountUp from "react-countup";

export default function Capsule({
  name,
  playerCount,
  imageURL,
  showPlayerData,
}: {
  name: string;
  playerCount: number;
  imageURL: string;
  showPlayerData: boolean;
}) {
  const showData: false | JSX.Element = showPlayerData && (
    <>
      <div className="text-gray-400 text-base pt-2">has</div>
      <div className="">
        {<CountUp end={playerCount} separator="," duration={0.5} />}
      </div>
      <div className="text-gray-400 text-base ">Monthly Active Players</div>
    </>
  );
  return (
    <>
      <img src={imageURL} className="w-96 rounded-3xl mx-auto" alt="" />
      <div className="font-bold pt-4">{name}</div>

      {showData}
    </>
  );
}
