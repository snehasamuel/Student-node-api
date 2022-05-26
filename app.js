const Express=require("express")
const Mongoose=require("mongoose")
const Bodyparser=require("body-parser")


let app=Express()

app.use(Bodyparser.urlencoded({extended:true}))
app.use(Bodyparser.json())

var studModel=Mongoose.model("students",
new Mongoose.Schema(
    {
        name:String,
        admission_no:String,
        cgpa:String
    }
))

Mongoose.connect("mongodb+srv://snehasam:snehasa4@cluster0.yyrcr.mongodb.net/Studentdb")

app.post("/api/addstud",(req,res)=>{
var getName=req.body.name 
var getAdmsn=req.body.admission_no
var getCgpa=req.body.cgpa 
var data={"name":getName,"admission_no":getAdmsn,"cgpa":getCgpa}
let studdetails=new studModel(data)
studdetails.save((error,data)=>
    {
        if(error)
        {
            res.send({"status":"error","data":error})
        }
        else{
            res.send({"status":"Success","data":data})
        }
    })

})

app.get("/api/viewstud",(req,res)=>{
res.send("Hello")
})

app.listen(7000,()=>{
    console.log("server running")
})