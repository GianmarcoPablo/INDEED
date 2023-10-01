import express from "express"
import dotenv from "dotenv"
import connectionDB from "./config/db.js"
import userRoutes from "./routes/Users.routes.js"
import vacanteRoutes from "./models/Vacante.js"

const app = express()
app.use(express.json())
dotenv.config()
connectionDB()

app.use("/api/users", userRoutes)
app.use("/api/vacantes", vacanteRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server running on port:  ${process.env.PORT} `);
})