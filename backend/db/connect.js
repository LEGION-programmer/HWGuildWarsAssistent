const mongoose = require('mongoose')
require('dotenv').config()
// get connection with db
const url = process.env.DB_CONNECT

// db configuration
mongoose.set('strictQuery', false)


try{
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(console.log('Connected whith db'))
    
}catch(error){
    console.log(error)
}