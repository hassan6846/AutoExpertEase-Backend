const stripe = require('stripe')(
    'sk_test_51NIDjMKxIUjmCPdC4id3S491SksG21yUpaIbrrv7Sae3LHTjyTbwXWtaCPHJSs5ca1HS5vxMHL1DLlVvlvc8J1HT00l58Yt9l5'
  );
  
  const CreatePayment = async (req, res) => {
    const platformFee = 8; // Platform fee in PKR
  
    try {
      // Convert the amount to paisa
      const amountInPaisa = req.body.amount * 100; // Assuming amount is provided in PKR
  
      if (amountInPaisa < 20000) {
        return res.status(400).json({
          success: false,
          msg: "Order Amount must be at least 200 PKR",
        });
      }
  
      // Convert platform fee to paisa
      const platformFeeInPaisa = platformFee * 100;
  
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInPaisa +platformFeeInPaisa,
      
        currency: "pkr",
        automatic_payment_methods: {
          enabled: true,
        },
      
      });
  
      res.json({ paymentIntent:paymentIntent.client_secret });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        msg: "Internal Server Error from Payment",
      });
    }
  };
  //Add Topups
  const AddTopup=async(req,res)=>{
    const { amount } = req.body;
    //User id ref to expert id
    const {id}=req.params;
    

  }
  module.exports = { CreatePayment };
  