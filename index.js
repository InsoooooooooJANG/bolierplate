const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 5000

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));

// application/json
app.use(bodyParser.json());

const {User} = require('./models/User')

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://insoo:parameter5507@bolierplate.fkht7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(()=> console.log('MongoDB Connected...'))
    .catch(err=> console.log(err))


app.get('/', (req, res) => res.send('Hello World'))
app.post('/register', (req, res) => {
    const user = new User(req.body)
    user.save((err,userInfo) => {
        if(err) return res.json({success:false, err}) 
        return res.status(200).json({
            success:true
        })
    })
})

app.listen(port, ()=> console.log(`Example app listening on port ${port}!`))