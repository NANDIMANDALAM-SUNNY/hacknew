var express = require('express');

const mongoose = require('mongoose')
const {dburl} = require('./dbConnection')
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');
const cors = require('cors')
var app = express();

// view engine setup



mongoose.connect(dburl).then(
  () => {console.log(`Database is Connected`) },
  err => { console.log(`Not Connected`) }
);


app.use(express.json());
app.use(express.urlencoded({ extended: false ,limit: '50mb'}));


app.use(cors())

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/api', apiRouter);

app.get('/',(req,res)=>{
    res.send("Hello World!");
})





const PORT = process.env.PORT || 8000
app.listen(PORT,()=>{
console.log(`server listening on ${PORT}`)
})




module.exports = app;
