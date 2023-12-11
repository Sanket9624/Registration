const app = require("./app")
const dotenv = require("./dotenv")

const port = process.env.PORT
app.listen(port,()=>{
            console.log(`App is running on http://localhost:${port}`)
})