import express from "express"
import connectToDb from "./config/db"
import {readdirSync} from "fs"
import cors from "cors"
const morgan = require("morgan")
require("dotenv").config()

const app = express()


connectToDb()



///middleware///

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())



//// route MiddleWare////
readdirSync("./backend/routes").map((r)=> app.use("/api", require(`./routes/${r}`)))
// app.use("/api",router)





const port = process.env.PORT || 5000

app.listen(port,()=>{

console.log(`Server started at ${port}`)


})
