import { KeyedMutator } from "swr";
import { Color } from "../utils";
export default function Button({
  text,
  color,
  mutate,
  data,
}: {
  text: string;
  color: Color;
  mutate: KeyedMutator<any>;
  data: any;
}) {
  let btnClass: string =
    color === Color.Red
      ? "bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      : "bg-green-700 hover:bg-green-800 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900";

  return (
    <div>
      <button
        type="button"
        className={`focus:outline-none text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ${btnClass}`}
        onClick={() => {
          mutate({ ...data });
        }}
      >
        {text}
      </button>
    </div>
  );
}
