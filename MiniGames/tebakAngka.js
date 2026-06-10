const rl = require("readline/promises").createInterface({
      input: process.stdin,
      output: process.stdout,
});

async function game() {
      console.clear();

      console.log("\x1b[34m====== TEBAK ANGKA ======\x1b[0m");
      console.log("\x1b[36mTebak angka dari 1 sampai 10\x1b[0m\n");

      const angka = Math.floor(Math.random() * 10) + 1;
      let chance = 3;

      while (chance > 0) {
            console.log(`Kesempatan tersisa: ${chance}`);

            const input = await rl.question("Input angka: ");
            const tebakan = Number(input);

            // Validasi input
            if (isNaN(tebakan)) {
                  console.log("\x1b[33mMasukkan angka yang valid!\x1b[0m\n");
                  continue;
            }

            if (tebakan < 1 || tebakan > 10) {
                  console.log("\x1b[33mAngka harus antara 1 - 10!\x1b[0m\n");
                  continue;
            }

            if (tebakan === angka) {
                  console.log("\n\x1b[32m Selamat! Tebakan kamu benar!\x1b[0m");
                  rl.close();
                  return;
            }

            chance--;

            if (chance > 0) {
                  if (tebakan < angka) {
                        console.log("\x1b[31mTerlalu kecil!\x1b[0m\n");
                  } else {
                        console.log("\x1b[31mTerlalu besar!\x1b[0m\n");
                  }
            }
      }

      console.log(
            `\n\x1b[31mGame Over! Angka yang benar adalah ${angka}\x1b[0m`,
      );

      rl.close();
      process.exit();
}

game();
