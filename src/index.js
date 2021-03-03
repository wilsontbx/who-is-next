const app = require("./app");
const PORT = 5000;
require("./config/utils/db");

const server = app.listen(PORT, () => {
  console.log(`Express app started on http://localhost:${PORT}`);
});
