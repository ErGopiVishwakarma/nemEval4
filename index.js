const  express = require('express')

const cors = require('cors')
const socialRouter = require('./route/socialRoute')
const auth = require('./middleware/auth')
const userRouter = require('./route/userRoute')
const connection = require('./config/db')
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