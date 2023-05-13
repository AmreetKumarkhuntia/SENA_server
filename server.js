const express = require('express');
const app = express();
const cors=require('cors');

const port=2000;








app.listen(port,()=>{
    console.log('listening on port ' + port);
});