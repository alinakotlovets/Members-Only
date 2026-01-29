import express from "express";
import path from "node:path";
import {fileURLToPath} from "node:url";
import session from "express-session";
import {initializePassport} from "./middleware/passport.js";
import setUserLocals from "./middleware/setUserLocals.js";
import signUpRouter from "./routes/signUpRouter.js";
import singInRouter from "./routes/singInRouter.js";
import messagesRouter from "./routes/messagesRouter.js";
import indexRouter from "./routes/indexRouter.js";
import membershipRouter from "./routes/membershipRouter.js";
import adminRouter from "./routes/adminRouter.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const passportInstance = initializePassport();

app.use(session({secret: "cats", resave: false, saveUninitialized: false}));
app.use(passportInstance.initialize());
app.use(passportInstance.session());
app.use(setUserLocals);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));


app.use("/admin", adminRouter)
app.use("/membership", membershipRouter);
app.use("/message", messagesRouter);
app.use("/sign-in", singInRouter);
app.use("/sign-up", signUpRouter);
app.use("/", indexRouter);
app.use((req, res) => {
    res.render("404");
})


const port = 3000;

app.listen(port, () => {
    console.log(`running at port: ${port}`)
})