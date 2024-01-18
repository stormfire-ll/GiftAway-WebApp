const express = require('express')
require('dotenv').config()
const cors = require('cors')
const loginRouter = require('./routes/LoginRouter')
const registerRouter = require('./routes/RegisterRouter')
const connectToMongoDB = require('./db/database')
const categoryRouter = require('./routes/CategoryRouter')
const giftAwayRouter = require('./routes/GiftAwayRouter')
const cookieParser = require('cookie-parser')
const dashboardRouter = require('./routes/DashboardRouter')

const app = express()



app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(cookieParser())
app.use(express.json())


app.use("/login", loginRouter)
app.use("/register", registerRouter)
app.use("/giftaway", giftAwayRouter)
app.use("/category", categoryRouter)
app.use("/dashboard", dashboardRouter)



async function main() {
    try {
        await connectToMongoDB()
        console.log('Complete')
    }
    catch (err) {
        console.log(err)
    }
}

main()

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on port ${process.env.SERVER_PORT}`)
})

