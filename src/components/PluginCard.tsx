import {
  BsLayoutThreeColumns,
  BsTrashFill,
  BsArrowsAngleExpand,
  BsTable,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { PluginMode } from "../utils/types";
interface Props {
  name: string;
  type: PluginMode;
}

export default function PluginCard({ name, type }: Props) {
  return (
    <div className="bg-zinc-700 rounded-md overflow-hidden shadow-md">
      <div className="flex justify-between ">
        <div className="px-4 py-2">
          <h2 className="font-bold text-lg">
            <Link to="/editor" className="hover:underline">
              {name}
            </Link>
          </h2>
          <div className="text-xs">By Ansell Maximilian</div>
        </div>
        <div className="bg-vs-dark px-4 py-2 flex items-center gap-2">
          {type === "TABLE" ? <BsTable /> : <BsLayoutThreeColumns />}
          <div>{type === "TABLE" ? "Table" : "Column"}</div>
        </div>
      </div>
      <div>
        <div className="px-4 py-2 bg-zinc-800 flex gap-4 items-center">
          <Link
            to="/editor"
            className="bg-zinc-600 hover:bg-zinc-700 px-2 py-2 rounded-md"
          >
            <BsArrowsAngleExpand />
          </Link>
          <button className="bg-zinc-600 hover:bg-zinc-700 px-2 py-2 rounded-md">
            <BsTrashFill />
          </button>
        </div>
      </div>
    </div>
  );
}
