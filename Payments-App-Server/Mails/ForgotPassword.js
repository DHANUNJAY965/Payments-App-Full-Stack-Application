const nodemailer = require("nodemailer");
const ForgotPassword=async (email, password)=> {
    try {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
      // transporter
      let mailTransporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      });
      mailTransporter.verify(function (error, success) {
        if (error) {
          console.error("Mail transporter error:", error);
        } else {
          // console.log("Mail transporter is ready to send emails");
        }
      });
  
      // send mail
      let info = await mailTransporter.sendMail({
        from: `Payments App`,
        to: email,
        subject: "Forgot Password Payments App! 🚀",
        html: `
        <div style="background-color: #f0f0f0; padding: 20px; text-align: center; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
              <h1 style="color: #3498db; font-size: 28px;">Payments App - Forget Password</h1>
              <p style="color: #555; font-size: 16px;">Dear User,</p>
              <p style="color: #555; font-size: 16px;">We received a request to reset your password. Below is your original password:</p>
              <h1 style="color: #3498db; font-size: 36px; margin: 10px 0;">${password}</h1>
              <p style="color: #555; font-size: 16px;">For security reasons, please remember to keep your password confidential.</p>
              <p style="color: #555; font-size: 16px;">After signing in, we recommend changing your password to enhance security.</p>
              <p style="color: #3498db; font-size: 18px;">Best wishes,</p>
              <p style="color: #3498db; font-size: 18px;">Burada Dhanunjay</p>
              <p style="color: #555; font-size: 16px;">Founder, Payments App</p>
              <p style="color: #555; font-size: 16px;">Sent with lots of love ❤️</p>
            </div>
        `,
      });
  
    } catch (e) {
      console.log("Error: " + e);
    }
  }
  module.exports ={
    ForgotPassword
  }