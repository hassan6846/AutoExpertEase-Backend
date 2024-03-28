const { default: axios } = require("axios");
const OtpGenerator=require("otp-generator")

const sendOtpPhone= async(phone) =>{
    const otp = Math.floor(1000 + Math.random() * 9000); // Generates a 4-digit OTP
    console.log(otp)
    try {
        const response = await axios.post("https://api.veevotech.com/v3/sendsms", {
            "apikey": "d593a1cfd2e75e1e08e292b45e2df894",
            "receivernum": phone,
            "sendernum": "Default",
            "textmessage": `The OTP Key for AutoExpertEase is ${otp}`
        });
        console.log("OTP sent successfully. API Response:", response.data);
    } catch (error) {
        console.error("Error sending OTP:", error.message);
        // You can handle errors here, such as retrying or logging to a monitoring system
    }
}

module.exports = {sendOtpPhone}