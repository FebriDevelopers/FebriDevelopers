const fs = require("fs");
const rl = require("readline/promises").createInterface({
      input: process.stdin,
      output: process.stdout,
});

async function Read() {
      try {
            // masukkan id
            const id = await rl.question("ID: ");
            //search id
            const data = fs.readFileSync("crudData.json", "utf-8");
            const dataJSON = JSON.parse(data);
            const user = dataJSON.find((user) => user.id === Number(id));
            console.log(`nama: ${user.nama}\nClass: ${user.class}`);
      } catch (error) {
            console.log(error);
      } finally {
            rl.close();
      }
}
Read();
