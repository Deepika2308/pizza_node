import express from "express"; 
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
const app = express();
const PORT = 4400;

dotenv.config();
app.use(express.json());

async function createConnection(){
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("Mongo db is connected!!");
    return client;
}
const MONGO_URL = process.env.MONGO_URL;
const client = await createConnection();

app.get("/", function(req,res){
    res.send("Hello World");
});

app.post("/user/signup", async function(req,res){
    let newUser = req.body;
    const result = await client.db("b27we").collection("users").insertOne(newUser);
    res.send(result);
});


app.listen(PORT, () => console.log(`Server has started in ${PORT}`));