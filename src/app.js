const express= require("express");
const path= require("path");
const hbs=require("hbs");
const app=express();
const port= process.env.PORT || 5000; 

const Register = require("./models/registers");
const Feedback = require("./models/feedbacks");
const exp = require("constants");
require("./db/conn");
require("./db/conn2");


const static_path= path.join(__dirname ,"../public");

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static(static_path));
app.set("view engine", "hbs");

app.get('/',async (req,res)=>{
    res.render("Regis");
}); 
app.get('/Home',async (req,res)=>{
    res.render("index");
}); 

app.get('/login', async (req,res)=>{
    res.render("login");
})

app.post('/Registration',async(req,res)=>{
    try{
       const password= req.body.password;
       const cpassword = req.body.confirmpassword;

       if(password === cpassword)
       {
            const EmployeeRegister = new Register({
                fullname: req.body.fullname,
                email: req.body.email,
                phoneno: req.body.phoneno,
                DOB: req.body.DOB,
                gender: req.body.gender,
                address: req.body.address,
                city: req.body.city,
                region: req.body.region,
                pincode: req.body.pincode,
                password: password,
                confirmpassword: cpassword
            })
            const registered = await EmployeeRegister.save();
            res.status(201).render("login");
       }
       else{
          res.send("****Password not matching****");
       }

    } catch(err)
    {
        res.status(400).send(err);
    }
})

app.post('/Feedback_status', async (req, res)=>{
    try{
        const feedbackregister = new Feedback({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            Country: req.body.Country,
            review: req.body.review
        })
        const feedbackregistered= await feedbackregister.save();
        res.status(201).render("Feedback_status");

    }
    catch(err)
    {
        res.send(err);
    }
})

app.post('/login', async(req, res)=>{
    try{

        const email = req.body.email;
        const password= req.body.password;

        const useremail = await Register.findOne({email:email});
        if(useremail)
        {
            if(useremail.password === password)
            {
                res.status(201).render("index");
            }
            else
            {
                res.send("Invalid Login");
            }
        }
        else
        {
            res.send("Email not registered");
        }   
    }
    catch(error)
    {
        res.send(error);
    }
})

app.listen(port,()=>{
    console.log(`Server is listening on port number ${port}`);
});
