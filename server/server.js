const express = require("express");
const app = express();
const cors = require('cors');
const initRoutes = require("./src/routes/web");
const userRouter = require("./src/routes/user");

global.__basedir = __dirname + "/.";

app.use(express.urlencoded({ extended: true }));
initRoutes(app);

app.use(cors());

//Middleware
app.use(express.static("public"));

app.use('/user', userRouter);


let port = 4000;
app.listen(port, () => {
    console.log(`Running at http://localhost:${port}`);
});