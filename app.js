const Express=require("express")
const Mongoose=require("mongoose")
const Bodyparser=require("body-parser")


let app=Express()

app.use(Bodyparser.urlencoded({extended:true}))
app.use(Bodyparser.json())

app.use((req, res, next) => { 
    res.setHeader("Access-Control-Allow-Origin", "*");  
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"   ); 
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS"   ); 
    next(); });

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

app.post("/api/deletestud",(req,res)=>{
var getID=req.body
studModel.findByIdAndRemove(getID,(error,data)=>{
if(error)
{
    res.send({"status":"error","data":error})
}
else{
    res.send({"status":"success","data":data})
}
})
})


app.post("/api/searchstud",(req,res)=>
{
var getAdmsn=req.body
studModel.find(getAdmsn,(error,data)=>{
    if(error)
    {
        res.send({"status":"error","data":error})
    }
    else{
        res.send({"status":"success","data":data})
    }
})
})

app.get("/api/viewstud",(req,res)=>{
studModel.find((error,data)=>{
if(error)
{
res.send({"status":"error"})
}
else{
res.send(data)
}
})
})

app.listen(7000,()=>{
    console.log("server running")
})