const sendEmail = require("../utils/sendEmail");

const sendContactMessage = async (req, res) => {

  try {

    const {

      name,

      email,

      subject,

      message

    } = req.body;

    const text = `
New Contact Message

Name : ${name}

Email : ${email}

Subject : ${subject}

Message :

${message}
`;

    await sendEmail(

      process.env.EMAIL_USER,

      subject,

      text

    );

    return res.status(200).json({

      success: true,

      message: "Message sent successfully"

    });

  }

  catch(error){

    console.log(error);

    return res.status(500).json({

      success:false,

      message:"Failed to send message"

    });

  }

};

module.exports = {

  sendContactMessage

};