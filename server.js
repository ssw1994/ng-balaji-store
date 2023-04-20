const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
const app = express();

const PORT = process.env.port || 5000;

const msg = `Server listening on ${PORT}`;
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send(`<h1>${msg}</h1>`);
});

const connection = require("./server/utils/connection");
connection();

app.use("/api/products", require("./server/routes/product.routes"));
app.use("/api/users", require("./server/routes/user.routes"));
app.use("/api/carts", require("./server/routes/cart.routes"));
app.use("/api/common", require("./server/routes/util.routes"));
app.use("/api/orders", require("./server/routes/order.routes"));
http.createServer(app).listen(PORT, () => {
  console.log(msg);
});
