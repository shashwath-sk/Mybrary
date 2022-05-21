if(process.env.NODE_ENV!=="production")
{
    require('dotenv').config();
}

const express = require('express');

const app = express();

const expressLayouts = require('express-ejs-layouts')

app.set('view engine','ejs')

app.set('views',__dirname+'/views');

app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))


const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL,
    {useNewUrlParser : true,
     useUnifiedTopology:true,
family:4});
// mongoose.connect('mongodb://localhost:27017/Mybrary',
//     {useNewUrlParser : true,
//      useUnifiedTopology:true,
//     family:4})
const db = mongoose.connection
db.on('error',err=>
{
    console.error(err)
})

db.once('open',()=>
{
    console.log("connected to mongoose")
})

const indexRouter = require('./routes/index')

app.use('/',indexRouter)
app.listen(process.env.PORT || 3000)