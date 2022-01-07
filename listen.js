const app = require("./app");

let { PORT } = process.env.PORT || 8000;
if (PORT === undefined) {
  PORT = 9090;
}
app.listen(PORT, (err) => {
  console.log("App is running on port ", PORT);
  if (err) throw err;
});
