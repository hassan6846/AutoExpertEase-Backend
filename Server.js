const app = require("./app");//entry

const port = process.env.PORT
app.listen(port,'0.0.0.0',()=>{
    console.log(`App is Running on Port ${port}`)
})