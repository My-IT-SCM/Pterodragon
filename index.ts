import Pterodragon from "./src/Pterodragon";
import config from "./config.json";

async function main() {
  const ptero = new Pterodragon();
  await ptero.init();
  await ptero.login(config["discord-token"]);
  await ptero.start();
}

main();
