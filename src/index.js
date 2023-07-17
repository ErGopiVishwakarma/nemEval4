const  express = require('express')
const connection = require('./config/db')
const userRouter = require('./route/userRoute')
const socialRouter = require('./route/socialRoute')
const auth = require('./middleware/auth')
const cors = require('cors')
const app = express()
const port = 8080
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => res.send('Hello World!'))

app.use('/users',userRouter)
app.use('/posts',auth,socialRouter)








app.listen(port, async() =>{
    try {
        await connection
        console.log('connected to db')
        console.log(`listening on port ${port}!`)
    } catch (error) {
        console.log(error)
    }   
}
)