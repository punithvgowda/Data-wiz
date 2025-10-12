const express = require("express");
const path = require("path");
const app = express();
const flash=require("connect-flash");
const session=require("express-session");
const student=require("./schema");
const mongoose=require("mongoose");

async function main() {
    mongoose.connect('mongodb://127.0.0.1:27017/myapp');
    
}
main().then((res)=>{
    console.log(" Connection successfull");
})
.catch((err)=>console.group(err));

// ✅ view engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// ✅ middleware
app.use(express.static(path.join(__dirname, "public"))); // serve frontend assets
app.use(express.urlencoded({ extended: true })); // parse form data

app.use(express.static(path.join(__dirname, "public"), {
    etag: false,
    maxAge: 0
}));

app.use(session({
    secret:"password",
    resave:false,
    saveUninitialized:true
}))
app.use(flash());
app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    next();
})

let port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// ✅ routes
app.get("/", (req, res) => {
    res.render("web"); // loads views/index.ejs
});

app.get("/register", (req, res) => {
    res.render("register"); // loads views/register.ejs
});
app.get("/team",(req,res)=>{
    res.render("team")
})
app.get("/about",(req,res)=>{
    res.render("about")
})


app.post("/register", (req, res) => {
    const { name, usn, email, domain, contact, year } = req.body;

    const student1 = new student({
        name:name,
        usn:usn,
        email:email,
        domain: Array.isArray(domain) ? domain : [domain], // ensure it's an array
        contact:contact,
        year:year
    });

    student1.save()
        .then(() => {
            req.flash("success", "Successfully Registered!");
            res.redirect("/"); // redirect to home page
        })
        .catch((err) => {
            console.log(err);
            req.flash("error", "Something went wrong. Please try again.");
            res.redirect("/register");
        });
});

