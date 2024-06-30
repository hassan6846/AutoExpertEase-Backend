const mongoose = require("mongoose");
//main DBConnnect Function..
async function ConnectMongodb() {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING_MONGO, {
      // We'll Add database configs here in the future....


    })
      .then(() => {
        console.log('DB connected');
      })
      .catch((err) => {
        console.error('DB connection error:', err.message);
      });
  } catch (err) {
    console.error('DB connection error:', err.message);
  }
}
module.exports = { ConnectMongodb }