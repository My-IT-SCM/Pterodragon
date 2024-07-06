import fetch from "node-fetch";
import config from "@/config.json";

let panelURL = config["panel-URL"];
if (!panelURL) throw new Error("Panel URL not provided in config.json");
panelURL =
  panelURL.startsWith("http://") || panelURL.startsWith("https://")
    ? panelURL
    : `https://${panelURL}`;

const headers: requestHeader = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
if (config.auth.apiKey) {
  headers["Authorization"] = `Bearer ${config.auth.apiKey}`;
} else if (config.auth.cookie) {
  headers["cookie"] = `Bearer ${config.auth.cookie}`;
}

async function sendRequest({
  method,
  endpoint,
  data,
}: {
  method?: string;
  endpoint: string;
  data?: any;
}) {
  if (!headers.cookie && !headers.Authorization)
    throw new Error("No authentication method provided in config.json");

  const res = await fetch(`${panelURL}${endpoint}`, {
    headers: headers,
    body: data,
  });
  return await res.json().catch((err) => {
    console.log(err.message);
  });
}

export default sendRequest;
