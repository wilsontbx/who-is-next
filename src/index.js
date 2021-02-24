const app = require("./app");
const PORT = 5000;

const server = app.listen(PORT, () => {
    console.log(`Express app started on http://localhost:${PORT}`);
});
