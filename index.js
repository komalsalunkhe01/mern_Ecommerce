require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const server = express();
const path = require('path');
const productRouter = require('./routes/products')
const userRouter = require('./routes/user')
const mongoose = require('mongoose');
const cors = require('cors');

//db connection  mongodb://localhost:27017/
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log('database connected')
}

console.log('env',process.env.DB_PASSWORD)
//bodyParser
server.use(cors());
server.use(express.json());
server.use(morgan('default'));
// server.use(express.static('build'));
server.use(express.static(path.resolve(__dirname,process.env.PUBLIC_DIR)));
server.use('/products',productRouter.router);
server.use('/users',userRouter.router);
server.use('*',(req,res)=>{
  res.sendFile(path.resolve(__dirname,'build','index.html'))
})



server.listen(8080, () => {
  console.log('server started');
});