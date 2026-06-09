const fs = require("fs");
const { json } = require("stream/consumers");
const rl = require("readline/promises").createInterface({
      input: process.stdin,
      output: process.stdout,
});
const numberOnly = /^[0-9]+$/;
const textOnly = /^[a-zA-Z\s]+$/;
function green(text) {
      return `\x1b[32m${text}\x1b[0m`;
}
function red(text) {
      return `\x1b[31m${text}\x1b[0m`;
}
function blue(text) {
      return `\x1b[34m${text}\x1b[0m`;
}
async function readData() {
      try {
            const data = fs.readFileSync("./crudData.json", "utf-8");
            const extractData = JSON.parse(data);
            const input = await rl.question(`\x1b[0mInput Id: \x1b[32m\x1b`);
            if (input === "q") {
                  console.log(blue("Bye!~~"));
                  process.exit();
            } else if (
                  !extractData.find((item) => item.id === parseInt(input))
            ) {
                  console.log(red("ID not found"));
                  return readData();
            }
            const found = extractData.find(
                  (item) => item.id === parseInt(input),
            );
            console.log(
                  `id: \x1b[32m${found.id}\x1b[0m\nnama: \x1b[34m${found.nama}\x1b[0m\numur: \x1b[32m${found.umur}\x1b[0m\n`,
            );
            return menuSection();
      } catch (error) {
            console.log(error);
      }
}
function inputData() {
      const dataFile = fs.readFileSync("./crudData.json", "utf-8");
      const extractData = JSON.parse(dataFile);
      rl.question("Input Nama: ").then((name) => {
            if (textOnly.test(name) === false) {
                  console.log(red("Invalid Input"));
                  return inputData();
            }
            rl.question("Input Umur: ").then((age) => {
                  if (numberOnly.test(age) === false) {
                        console.log(red("Invalid Input"));
                        return inputData();
                  }
                  const data = {
                        id: extractData[extractData.length - 1].id + 1,
                        nama: name,
                        umur: Number(age),
                  };
                  fs.writeFileSync(
                        "./crudData.json",
                        JSON.stringify([...extractData, data], null, 6),
                  );
                  console.log(data, "\n");

                  menuSection();
            });
      });
}
async function updateData() {
      try {
            const dataFile = fs.readFileSync("./crudData.json", "utf-8");
            const extractData = JSON.parse(dataFile);
            const input = await rl.question("Input ID: ").then((ID) => {
                  if (ID === "q") {
                        console.log(blue("Bye!~~"));
                        process.exit();
                  } else if (
                        !ID === undefined ||
                        !extractData.find((item) => item.id === parseInt(ID))
                  ) {
                        console.log(red("ID not found"));
                        return updateData();
                        rl.close();
                  }
                  console.log(
                        extractData.find((item) => item.id === parseInt(ID)),
                  );

                  rl.question("Input Name: ").then((name) => {
                        if (textOnly.test(name) === false) {
                              console.log(red("Invalid Input"));
                              return updateData();
                        }
                        rl.question("Input Umur: ").then((age) => {
                              if (numberOnly.test(age) === false) {
                                    console.log(red("Invalid Input"));
                                    return updateData();
                              }
                              const data = {
                                    id: Number(ID),
                                    nama: name,
                                    umur: Number(age),
                              };
                              fs.writeFileSync(
                                    "./crudData.json",
                                    JSON.stringify(
                                          [...extractData, data],
                                          null,
                                          6,
                                    ),
                              );
                              console.log(data, "\n");
                              menuSection();
                        });
                  });
            });
      } catch (error) {
            console.log(red(error));
      }
}
function deleteData() {
      const data = fs.readFileSync("./crudData.json", "utf-8");
      const extractData = JSON.parse(data);
      const input = rl.question("Input ID: ").then((ID) => {
            const filter = extractData.filter(
                  (item) => item.id !== parseInt(ID),
            );
            fs.writeFileSync(
                  "./crudData.json",
                  JSON.stringify(filter, null, 6),
            );
            console.log(green("data deleted successfully!!\n"));
            menuSection();
      });
}
async function menuSection() {
      try {
            const data = await fs.readFileSync("./crudData.json", "utf-8");
            const filter = JSON.parse(data);
            console.log(
                  `-Input Data: press i + enter\n-Read Data: press r + enter\n-Update Data: press u + enter\n-Delete Data: press d + enter\n-Exit: press q + enter\n`,
            );
            const input = await rl.question("Select Menu: ");
            switch (input) {
                  case "i":
                        inputData();
                        break;
                  case "r":
                        readData();
                        break;
                  case "u":
                        updateData();
                        break;
                  case "d":
                        deleteData();
                        break;
                  case "q":
                        console.log(blue("Bye!~~"));
                        process.exit();
                        break;
                  default:
                        console.log(red("Invalid Input"));
                        menuSection();
            }
      } catch (error) {
            console.log(error);
      }
}
menuSection();
