export default function Capsule({
  name,
  playerCount,
  imageURL,
}: {
  name: string;
  playerCount: number;
  imageURL: string;
}) {
  return (
    <div>
      <img src={imageURL} className="w-96 rounded-3xl" alt="" />
      <div className="font-bold pt-4">{name}</div>
      <div className="text-gray-400 text-base pt-2">has</div>
      <div className="">{playerCount}</div>
      <div className="text-gray-400 text-base ">Monthly Active Players</div>
    </div>
  );
}
