require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const postRoute = require("./routes/post");

// constant values
PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

// Database
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connection success"))
.catch(err => console.log(err));

app.use("/user", userRoute);
app.use("/post", postRoute);

function errorHandler(err, req, res, next){
    if(res.headerSend){
        return next(err);
    }
    res.status(500).json({error : err});
}
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Listening at http://127.0.0.1:${PORT}`);
});