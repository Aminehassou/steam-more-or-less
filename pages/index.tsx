import useSWR from "swr";

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
      <main className="grid grid-cols-2 gap-4 text-center text-white text-3xl">
        <div>
          <div className="font-bold ">{data.name}</div>
          <div className="">{data.playerCount}</div>
        </div>
      </main>
    </div>
  );
}
