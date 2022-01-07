const app = require("./app");

let { PORT } = process.env;
if (PORT === undefined) {
  PORT = 9090;
}
app.listen(PORT || 5500, (err) => {
  if (err) throw err;
});
