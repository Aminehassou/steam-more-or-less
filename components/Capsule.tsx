import CountUp from "react-countup";
import Button from "./Button";
import { Color } from "../utils";

export default function Capsule({
  name,
  playerCount,
  imageURL,
  showPlayerData,
  onClick,
  isLeft,
}: {
  name: string;
  playerCount: number;
  imageURL: string;
  showPlayerData: boolean;
  onClick: any;
  isLeft: boolean;
}) {
  const capsuleText: "" | JSX.Element = showPlayerData ? (
    <div className="h-10	">
      <div className="text-gray-400 text-base pt-2">has</div>
      <div className="">
        {isLeft ? (
          playerCount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") // Add decimal seperator with regex
        ) : (
          <CountUp end={playerCount} separator="," duration={0.5} />
        )}
      </div>
      <div className="text-gray-400 text-base ">Monthly Active Players</div>
    </div>
  ) : (
    <div className="h-10 pt-0.5">
      <Button text={"Higher"} color={Color.Red} onClick={onClick} />
      <Button text={"Lower"} color={Color.Green} onClick={onClick} />
    </div>
  );
  return (
    <>
      <img src={imageURL} className="w-96 rounded-3xl mx-auto" alt="" />
      <div className="font-bold pt-4">{name}</div>

      {capsuleText}
    </>
  );
}
