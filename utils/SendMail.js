const nodemailer = require("nodemailer")
//transporter
const mailSender = async (email,otp) => {
    try {
        //create a transporter
        let transporter = nodemailer.createTransport({
            service: "Gmail",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            //admin password etc sender account
            auth: {
                user: "ha6817334@gmail.com",
                pass: "zjqbnahmxjxvcodt",
            },
        })

        //send mail to users
        let info = await transporter.sendMail({
            from: "www.autoExpertEase.pk",
            to: email,
            subject: "Otp password",
            html: `h1>Your One time password iss ${otp}</h1>`

        })
    } catch (error) {
        console.log(error.message)
    }
}
module.exports = mailSender