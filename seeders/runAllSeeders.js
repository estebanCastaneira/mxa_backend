require("dotenv").config();

async function runAllSeeders() {
  await require("./articleSeeder")();
  await require("./adminSeeder")();
  await require("./staffSeeder")();

  console.log("[Database] ¡Los datos de prueba fueron insertados!");
}

runAllSeeders();
