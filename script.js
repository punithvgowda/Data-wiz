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


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));



app.use(express.static(path.join(__dirname, "public"))); 
app.use(express.urlencoded({ extended: true }));

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


app.get("/", (req, res) => {
    res.render("web"); 
});

app.get("/register", (req, res) => {
    res.render("register"); 
});
app.get("/team",(req,res)=>{
    res.render("team")
})
app.get("/about",(req,res)=>{
    res.render("about")
})
app.get("/signup",(req,res)=>{
    res.render("signup")

})
app.get("/login",(req,res)=>{
    res.render("login")
})


app.post("/register", (req, res) => {
    const { name, usn, email, domain, contact, year } = req.body;

    const student1 = new student({
        name:name,
        usn:usn,
        email:email,
        domain: Array.isArray(domain) ? domain : [domain], 
        contact:contact,
        year:year
    });

    student1.save()
        .then(() => {
            req.flash("success", "Successfully Registered!");
            res.redirect("/"); 
        })
        .catch((err) => {
            console.log(err);
            req.flash("error", "Something went wrong. Please try again.");
            res.redirect("/register");
        });
});

