const express = require('express');
const app = express();
const cors=require('cors');
const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');

const port=2000;

app.use(cors());


//MODEL LOADING USING TENSORFLOW
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//EXAMPLE PREDICTIONS

async function loadModel() {
    const model = await tf.loadLayersModel('file://models/model.json');
    model.summary();

    // Create an input tensor
    const input = tf.tensor2d(["i love you"], [1, 1]);

    // Make a prediction
    const prediction = model.predict(input);

    // Log the prediction
    prediction.print();

  }
  
loadModel();

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

app.get('/', function(req, res) {
    res.send("hello world!");



});

app.get('/sentiment', (req,res)=>{

    var sentiment;

    req.query.sentence?sentiment = req.query.sentence:"";



    res.send(sentiment);
});


app.listen(port,()=>{
    console.log('listening on port ' + port);
});