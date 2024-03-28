const app = require("./app");//entry
const { ConnectMongodb } = require("./db/ConnectionDb");


//connect Db
ConnectMongodb()



///Running Express Server....
const port = process.env.PORT ||3000
app.listen(port,'0.0.0.0',()=>{
    console.log(`App is Running on Port ${port}`)
})