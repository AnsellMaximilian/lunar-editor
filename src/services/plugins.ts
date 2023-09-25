import { nanoid } from "nanoid";
import http from "../utils/http";
import { OuterbaseResponse, Plugin } from "../utils/types";

export const createPlugin = (
  user_id: string,
  plugin_name: string,
  plugin_code: string,
  plugin_type: string
) => {
  return http.post("/create-plugin", {
    user_id,
    plugin_name,
    plugin_code,
    plugin_type,
    id: nanoid(),
  });
};

export const getUserPlugins = (user_id: string) => {
  return http.get<OuterbaseResponse<Plugin>>(`/get-plugins?user_id=${user_id}`);
};
