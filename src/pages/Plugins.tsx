import { Link } from "react-router-dom";
import PluginCard from "../components/PluginCard";
import { BsPuzzleFill } from "react-icons/bs";
import logoLight from "../assets/lunar-logo-light.svg";
import { UserButton, useAuth } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { deletePluginById, getUserPlugins } from "../services/plugins";
import { Plugin } from "../utils/types";
import Confirmation from "../components/Confirmation";

export default function Plugins() {
  const [ownPlugins, setOwnPlugins] = useState<Plugin[]>([]);
  const [pluginsLoading, setPluginsLoading] = useState(false);
  const { userId } = useAuth();
  const [pluginToDeleteId, setPluginToDeleteId] = useState<null | string>(null);

  useEffect(() => {
    (async () => {
      if (userId) {
        setPluginsLoading(true);
        const res = await getUserPlugins(userId);

        if (res.data.success) {
          setOwnPlugins(res.data.response.items);
          setPluginsLoading(false);
        }
      }
    })();
  }, [userId]);

  const deletePlugin = () => {
    (async () => {
      if (pluginToDeleteId && userId) {
        try {
          await deletePluginById(pluginToDeleteId, userId);
          setPluginToDeleteId(null);
          setOwnPlugins((prev) =>
            prev.filter((plugin) => plugin.id !== pluginToDeleteId)
          );
        } catch (error) {
          console.log(error);
        }
      }
    })();
  };

  return (
    <div className="bg-zinc-600 text-white min-h-screen">
      <header className="p-4 bg-zinc-800">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/">
              <img src={logoLight} className="w-20" />
            </Link>
            <ul className="flex items-center gap-4">
              <li>Your Plugins</li>
              <li>Browse Plugins</li>
            </ul>
          </div>
          <UserButton />
        </nav>
      </header>
      <main className="p-4">
        <div className="flex items-center justify-between mb-4 ">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <BsPuzzleFill /> <span>Your Plugins</span>
          </h2>
          <Link
            to="/editor"
            className="px-4 py-2 bg-zinc-800 rounded-md hover:bg-zinc-900"
          >
            Create New
          </Link>
        </div>
        {!userId && (
          <div className="bg-zinc-700 rounded-md shadow-md overflow-hidden px-2 py-4">
            <div className=" font-medium mb-2 text-center">
              Please log in to start saving and editing plugins
            </div>
            <div className="flex justify-center">
              <Link
                to="/sign-in"
                className="bg-vs-dark px-4 py-2 text-white rounded-md"
              >
                Log In
              </Link>
            </div>
          </div>
        )}
        <div className="grid grid-cols-12 gap-4">
          {pluginsLoading &&
            ownPlugins.length <= 0 &&
            [...Array(9)].map((_, i) => (
              <div
                key={i}
                className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 rounded-md bg-zinc-700 h-28 animate-pulse opacity-80"
              ></div>
            ))}
          {ownPlugins.map((plugin) => (
            <div
              className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3"
              key={plugin.id}
            >
              <PluginCard
                plugin={plugin}
                handleDelete={() => setPluginToDeleteId(plugin.id)}
              />
            </div>
          ))}
        </div>
      </main>
      <Confirmation
        open={!!pluginToDeleteId}
        onClose={() => setPluginToDeleteId(null)}
        onConfirm={deletePlugin}
      />
    </div>
  );
}
