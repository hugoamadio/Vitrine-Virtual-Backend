import * as dotenv from "dotenv"
import express from "express"

dotenv.config()

const app = express()
app.use(express.json())

//ROUTES





const port = process.env.PORT

app.listen(port, () => {
    console.log(`Server running on PORT: ${port}...`)
})