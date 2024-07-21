import Pterodragon from "./src/Pterodragon";
import config from "./config.json";

async function main() {
  const ptero = new Pterodragon(config);
  await ptero.init();
  await ptero.login(config["discord_token"]);
  await ptero.start();
}

main();
