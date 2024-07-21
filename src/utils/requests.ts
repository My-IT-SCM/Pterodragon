import fetch from "node-fetch";
import config from "@/config.json";

function getPanelURL() {
  let panelURL = config["panel_URL"];
  if (!panelURL) throw new Error("Panel URL not provided in config.json");
  panelURL =
    panelURL.startsWith("http://") || panelURL.startsWith("https://")
      ? panelURL
      : `https://${panelURL}`;
  return panelURL;
}

function getHeaders() {
  const headers: requestHeader = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  if (config.auth.apiKey) {
    headers["Authorization"] = `Bearer ${config.auth.apiKey}`;
  } else if (config.auth.cookie) {
    headers["cookie"] = `Bearer ${config.auth.cookie}`;
  } else {
    throw new Error("No authentication method provided in config.json");
  }
  return headers;
}

async function adminRequest({
  method,
  endpoint,
  data,
}: {
  method?: string;
  endpoint: string;
  data?: any;
}) {
  const headers = getHeaders();
  const panelURL = getPanelURL();

  const res = await fetch(`${panelURL}${endpoint}`, {
    headers: headers,
    method: method,
    body: data,
  });
  return await res.json().catch((err) => {
    console.log(err.message);
  });
}

async function userRequest({
  method,
  endpoint,
  data,
  key,
}: {
  method?: string;
  endpoint: string;
  data?: any;
  key: string;
}) {
  const headers: requestHeader = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${key}`,
  };
  const panelURL = getPanelURL();

  const res = await fetch(`${panelURL}${endpoint}`, {
    headers: headers,
    method: method,
    body: data,
  });
  return await res.json().catch((err) => {
    console.log(err.message);
  });
}

export { userRequest, adminRequest };
