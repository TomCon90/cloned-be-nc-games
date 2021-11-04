const app = require("./app");

// app.listen("9090", (req, res) => {
//   console.log("listening on 9090");
// });

let { PORT } = process.env;
console.log(PORT);
if (PORT === undefined) {
  PORT = 9090;
}
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Listening on ${PORT}...`);
});
