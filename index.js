let express = require("express");
let cors = require("cors");
let {MongoClient} = require("mongodb");

let app = express();
app.use(cors());
app.use(express.json());


//const url = "mongodb://0.0.0.0:27017";
const url = "mongodb+srv://menonadithya1331:k0Hzt0YViObQv0sQ@cluster0.5clb8op.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
app.post('/add',(req,res)=>{
    let client = new MongoClient(url);
    client.connect();

    let db = client.db("mern");
    let collec = db.collection('bookings');
    let data={
        name :req.body.name,
        event : req.body.event,
        time : req.body.time,
        phone:req.body.phone,
    }
    collec.insertOne(data)
    .then((result)=>{res.send(result)})
    .catch((error)=>{res.send(error)});
})
app.get('/get',(req,res)=>{
    let client = new MongoClient(url);
    client.connect();

    let db = client.db("mern");
    let collec = db.collection('bookings');
    
    collec.find().toArray()
    .then((result)=>{res.send(result)})
    .catch((error)=>{res.send(error)});
})

app.delete('/name',(req,res)=>{
    let client = new MongoClient(url);
    client.connect();

    let db = client.db("mern");
    let collec = db.collection('bookings');

    collec.deleteOne({name:req.body.name})
    .then((result)=>{res.send(result)})
    .catch((error)=>{res.send(error)});
})

app.listen(9000,()=>{console.log("Running!")})