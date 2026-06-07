const fs = require("fs");
const rl = require("readline/promises").createInterface({
      input: process.stdin,
      output: process.stdout,
});

async function Read() {
      try {
            const files = fs.readdirSync("./");
            const structureFile =
                  Math.max(...files.map((file) => file.length)) + 5;

            for (let i = 0; i < files.length; i += 2) {
                  let col1 = files[i] || "";
                  let col2 = files[i + 1] || "";
                  process.stdout.write(
                        `-${col1.padEnd(structureFile, " ") + col2}\n`,
                  );
            }

            const inputFile = await rl.question("\nInput File: ");

            // logic to find the file
            if (inputFile === "q") {
                  console.log("Bye!~~");
                  process.exit();
            } else if (!files.includes(inputFile)) {
                  console.log("File not found");
                  return Read();
            }

            const data = await fs.readFileSync(inputFile, "utf-8");
            console.log(`\n${data}\nctrl + c to exit`);
      } catch (error) {
            console.log(error);
      }
}
Read();
