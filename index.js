// Mohammad Haolader Portfolio Website 

const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const ObjectId = require("mongodb").ObjectId;
const cors = require ('cors');
require('dotenv').config()

// require
const app = express()
app.use(bodyParser.json())
app.use(cors())
const port = process.env.PORT || 7000;
// mongoDB connection

const uri = "mongodb+srv://reactportfolio:reactportfolio45@cluster0.vvccs.mongodb.net/reactPortfolioDb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vvccs.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
// console.log(uri);
// set Uri
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    const portflioCollection = client.db("reactPortfolioDb").collection("portfolio");
    // const orderCollection = client.db("portfolioDb404").collection("addOrder");
    // const reviewCollection = client.db("portfolioDb404").collection("addReview");
    // const adminCollection = client.db("portfolioDb404").collection("addAdmin");
    // perform actions on the collection object
    console.log('Data-Base connection successfully');



  // post data set to the mongodb database

  // add Portfolio
  app.post('/addPortfolio',(req, res) => {
    const newItems = req.body;
    console.log('adding new event: ', newItems);
    portflioCollection.insertOne(newItems)
    .then(result => {
      console.log('inserted Count', result.insertedCount);
      res.send(result.insertedCount > 0);
    })
  })


  
//  add review
app.post('/addReview',(req, res) => {
  const newItems = req.body;
  console.log('adding new event: ', newItems);
   reviewCollection.insertOne(newItems)
  .then(result => {
    console.log('inserted Count', result.insertedCount);
    res.send(result.insertedCount > 0);
  })
})


 // set data from database in server api


//  portfolio

 app.get('/portfolio',(req, res) => {
  portflioCollection.find()
    .toArray((err,items) =>{
      res.send(items)
  
    })
  })



// review

 app.get('/review',(req, res) => {
  reviewCollection.find()
    .toArray((err,items) =>{
      res.send(items)
  
    })
  })




 // Deleted data from database in server 
// services delete
 app.delete("/delete/:id" , (req, res) =>{
    const id = req.params.id;
    console.log(req.params.id); 
    portflioCollection.deleteOne({_id : ObjectId(id)})
    .then(documents => res.send("send"))
  })






  });








app.get('/', (req, res) => {
    res.send('Mohammad H. server-side');
  })
  
  
  app.listen(port)