import * as dotenv from "dotenv"
import express from "express"
import userRoutes from "./routes/users.routes"
import authRoutes from "./routes/auth.routes"

dotenv.config()

const app = express()
app.use(express.json())

//ROUTES
app.use("/user", userRoutes())
app.use("/login", authRoutes())


const port = process.env.PORT

app.listen(port, () => {
    console.log(`Server running on PORT: ${port}...`)
})