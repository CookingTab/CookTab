const express = require("express");
const cors = require("cors");
const router = require("./routes");
const dotenv = require("dotenv");
const app = express();
const cookieParser = require("cookie-parser");

dotenv.config();
app.use(cors());
app.use(cookieParser());
app.use(express.jsogit n());
app.use(express.static("public"));
app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`I Love You ${PORT}`);
});
