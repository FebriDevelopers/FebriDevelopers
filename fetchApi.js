const fs = require("fs");
const rl = require("readline/promises").createInterface({
      input: process.stdin,
      output: process.stdout,
});
function red(text) {
      return `\x1b[31m${text}\x1b[0m`;
}
function blue(text) {
      return `\x1b[34m${text}\x1b[0m`;
}
function green(text) {
      return `\x1b[32m${text}\x1b[0m`;
}
function loading() {
      return new Promise((resolve) => {
            let count = 0;
            let progress = 0;
            const bar = "\x1b[34m▆▆\x1b[0m";
            const strip = "\x1b[34m==\x1b[0m";
            const interval = setInterval(() => {
                  console.clear();
                  count += 20;
                  progress += 10;
                  process.stdout.write(
                        `\r[${bar.repeat(count / 20)}${strip.repeat(10 - progress / 10)}] Loading: ${progress}%`,
                  );
                  if (count === 200) {
                        clearInterval(interval);
                        setTimeout(() => {
                              console.clear();
                              resolve();
                        }, 1000);
                  }
            }, 250);
      });
}
async function read() {
      const url = "https://jsonplaceholder.typicode.com/posts";
      try {
            const numberOnly = /^[0-9]+$/;
            const fetchData = await fetch(url);
            const data = await fetchData.json();
            const input = await rl.question(`\x1b[0mInput Id: \x1b[32m\x1b`);
            const filter = data.find((item) => {
                  return item.id === parseInt(input);
            });

            if (numberOnly.test(input) === false || !filter) {
                  console.log(red("Invalid Input"));
                  return read();
            }
            const displayData = `id: ${green(filter.id)}\ntitle: ${filter.title}\nbody: ${filter.body}`;
            await loading();
            console.log(displayData);
            rl.close();
      } catch (error) {
            console.log(error);
      }
}
read();
