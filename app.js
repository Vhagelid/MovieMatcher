const debug = require("debug")("app");
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session")

// in compose
const dbConnString = process.env.MONGODB_CONNSTRING;
// development
//const dbConnString  = 'mongodb://localhost:27017';

debug(dbConnString);


const PORT = process.env.PORT || 5000;
const app = express();
// const sessionsRouter = require("./src/routers/sessionsRouter");
// const adminRouter = require("./src/routers/adminRouter");
const topMoviesRouter = require("./src/routers/topMoviesRouter");
// const authRouter= require("./src/routers/authRouter")(passport);
const authRouter= require("./src/routers/authRouter");
const supportRouter = require("./src/routers/supportRouter");
const aboutRouter= require("./src/routers/aboutRouter");


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan("tiny"));
app.use(express.static(path.join(__dirname, "/src/")));
app.use(express.static(path.join(__dirname, "/Static/")));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({secret: "V"
    // ,name:'uniqueSessionID'
    // ,saveUninitialized:false
    // ,resave: false
}
    
));

require("./src/config/passport.js")(app)

app.set("views", "./src/views");
app.set("view engine", "ejs");



// app.use("/sessions", sessionsRouter);
// app.use("/admin", adminRouter);
app.use("/movies", topMoviesRouter);
app.use("/auth", authRouter);
app.use("/support", supportRouter);
app.use("/about", aboutRouter);


app.use(express.json());

app.get("/",(req, res)=>{
       console.log("dbConnstr----");
       console.log(dbConnString);

      res.render("index");
});


app.listen(5000, ()=>{
    debug("listening on port 5000");

}); 


