const app = require("./app");

// app.listen("9090", (req, res) => {
//   console.log("listening on 9090");
// });

const { PORT } = process.env;

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Listening on ${PORT}...`);
});
