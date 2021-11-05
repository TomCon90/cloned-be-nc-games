const app = require("./app");

let { PORT } = process.env;
if (PORT === undefined) {
  PORT = 9090;
}
app.listen(PORT, (err) => {
  if (err) throw err;
});
