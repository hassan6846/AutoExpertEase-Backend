const mongoose = require("mongoose");
//main DBConnnect Function..
async function ConnectMongodb() {
  try {
    await mongoose.connect('mongodb+srv://HassanAli:rVjzBOFltsX0McAz@cluster0.g6nnuyy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
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