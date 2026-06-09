const fs = require("fs");
const rl = require("readline/promises").createInterface({
      input: process.stdin,
      output: process.stdout,
});
async function read() {
      try {
            const data = await fs.readFileSync("./crudData.json", "utf-8");
            const filter = JSON.parse(data);
            const input = await rl.question("Input ID: ");
            if (input === "q") {
                  console.log("Bye!~~");
                  process.exit();
            } else if (!filter.find((item) => item.id === parseInt(input))) {
                  console.log("ID not found");
                  return read();
            }

            const found = filter.find((item) => item.id === parseInt(input));
            console.log(found);
            return read();
      } catch (error) {
            console.log(error);
      }
}
read();
