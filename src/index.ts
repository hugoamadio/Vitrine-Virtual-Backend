import * as dotenv from "dotenv"
import express from "express"
import userRoutes from "./routes/users.routes"

dotenv.config()

const app = express()
app.use(express.json())

//ROUTES
app.use("/user", userRoutes())



const port = process.env.PORT

app.listen(port, () => {
    console.log(`Server running on PORT: ${port}...`)
})