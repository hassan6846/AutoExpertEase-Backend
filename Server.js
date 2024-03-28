const app = require("./app");//entry






///Running Express Server....
const port = process.env.PORT ||3000
app.listen(port,'0.0.0.0',()=>{
    console.log(`App is Running on Port ${port}`)
})