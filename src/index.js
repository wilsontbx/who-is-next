const app = require("./app");
const PORT = 5000;
require("../utils/db");

const PORT = 3000;
const server = app.listen(process.env.PORT || PORT, () => {
  console.log(`Express app started on http://localhost:${PORT}`);
});
