const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors({
    origin: "*",
}));

app.get("/book/getAll", (req, res) => {
    res.json({ title: "Hey"})
})

app.listen(3000)