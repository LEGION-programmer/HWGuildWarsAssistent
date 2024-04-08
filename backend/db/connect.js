const mongoose = require('mongoose')
require('dotenv').config()
// get connection with db
const url = process.env.DB_CONNECT || 'mongodb://127.0.0.1:27017/HW-wars'

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