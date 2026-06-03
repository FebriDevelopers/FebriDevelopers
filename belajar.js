const readline = require("readline/promises").createInterface({
      input: process.stdin,
      output: process.stdout,
});
const url = "https://jsonplaceholder.typicode.com/posts";
async function createPost() {
      try {
            console.log("==== CREATE POST ====");
            const input1 = await readline.question("User ID: ");
            const input2 = await readline.question("ID: ");
            const input3 = await readline.question("Title: ");
            const input4 = await readline.question("Body: ");
            const response = await fetch(url, {
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                        userId: input1,
                        id: input2,
                        title: input3,
                        body: input4,
                  }),
            });
            console.log("status: ", response.status);
            console.log("Ok: ", response.ok, "\qn");
            const data = await response.json();
      } catch (error) {
            console.log(error);
      }
}
async function getPosts() {
      try {
            console.log("==== GET POSTS ====");
            const input1 = await readline.question("ID: ");
            const response = await fetch(url);
            const data = await response.json();
            console.log("status: ", response.status);
            const posts = data.filter((post) => post.id === Number(input1));
            console.log(posts);
      } catch (error) {
            console.log(error);
      }
}
async function main() {
      try {
            await createPost();
            await getPosts();
      } catch (error) {
            console.log(error);
      } finally {
            readline.close();
      }
}
main();
