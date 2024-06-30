// GenerateOtp.js
function GenerateOtp() {
    const otp = Math.floor(Math.random() * 9000) + 1000; // Generate a random 4-digit OTP
    return otp.toString(); // Convert the number to string
}

module.exports = { GenerateOtp };
