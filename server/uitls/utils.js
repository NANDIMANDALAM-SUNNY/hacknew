const nodemailer = require('nodemailer');

const registerMail = async (name,email,verificationCode)=>{
    try {
         var transporter = nodemailer.createTransport({
         service:'gmail',
         auth:{
             user:'n.sunny170@gmail.com',
             pass:'goaqvmnboxeuqxuo'
         },
         tls:{
             rejectUnauthorized:false
         }
     });

     var  mailOptions={
             from: "myemail@gmail.com",
             to: email,
             subject: "Confirm Registration",
             text: "Hello world?", 
             html: `             
             <div style="margin:50px">
             <div style=" border: 1px solid black;border-radius: 30px;padding:20px ">
             <h3>Thank you for joining with us</h3>
                 <p>You will get notified for the latest news and updates</p>
                //  verificationCode
                <button style="padding:10px;background-color:green;color:white;border:none" > <a style="color:white" href="http://localhost:8000/confirm-account/${verificationCode}"  target=_blank>Confirm Your account</a></button>
                 <img width="300px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQKfVYiWBAIiYbX252T8tlMEDMoOZdTWf52sv3mFFV&s"  />
             </div>
         <p style="color:grey">You're receiving this email because this gmail account is associated with us.</p>
          </div>
             `,    
     }
      transporter.sendMail(mailOptions, function(error, response) {
                  if (error) {
                      console.log(error);
                      return;
                  }
                  console.log('Message sent');
                  transporter.close();
              });
    } catch (error) {
        // res.status(400).send({success:false,msg:error.message})
        console.log(error);
    }
}  


module.exports = {registerMail}
