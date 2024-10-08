const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000

// middleware

app.use(cors())

const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.ythezyh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    const houseDetails = client.db("Houses").collection('House')

    app.get('/house', async (req, res) => {
        const result = await houseDetails.find().toArray()
        res.send(result)
    })


    app.get('/house/:id', async (req, res) => {
        const id = req.params.id;
        const query = new ObjectId(id);
        const result = await houseDetails.findOne(query)
        res.send(result)
    })

    
    // Connect the client to the server	(optional starting in v4.7)
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('this is landing page')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})