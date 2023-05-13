const express = require('express');
const bodyParser = require('body-parser');
const tf = require('@tensorflow/tfjs-node');
const tokenizer = require('./tokenizer.json');
const { preprocessing } = require('@tensorflow/tfjs-layers');
const keras = require('@tensorflow/tfjs-layers');
const fs = require('fs');

const app = express();

// Load the converted model
let model;
async function loadModel() {
  model = await tf.loadLayersModel('file://models/model.json');
  model.summary();
}

loadModel();

// Define a route handler for the prediction endpoint
app.get('/predict', bodyParser.json(), async (req, res) => {
  try {
    // Get the input data from the request body
    const inputReview = 'I love shoes';

    // Load the tokenizer JSON file
    const tokenizerJson = fs.readFileSync('tokenizer.json', 'utf-8');

    // Convert the JSON object to a tokenizer object
    const tokenizerObj = await keras.preprocessing.text.tokenizerFromJSON(tokenizerJson);
    const sequences = tokenizerObj.textsToSequences([inputReview]);
    const inputPadded = tokenizerObj.textsToMatrix([inputReview], { binary: true });

    // Make a prediction using the loaded model
    const prediction = model.predict(inputPadded)[0][0];

    // Return the prediction result to the client
    if (prediction < 0.5) {
      res.json({ sentiment: 'negative' });
    } else {
      res.json({ sentiment: 'positive' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
