const pool = require("../database/db");

const otpGenerator = require("otp-generator");

const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const {

  saveOTP,

  getOTP,

  deleteOTP

} = require("../model/PasswordResetModel");

// ==========================
// SEND OTP
// ==========================

const sendOTP = async (req, res) => {

  try {

    const { email } = req.body;

    // Check if user exists

    const user = await pool.query(

      `
      SELECT *

      FROM users

      WHERE email = $1
      `,

      [email]

    );

    if (user.rows.length === 0) {

      return res.status(404).json({

        success: false,

        message: "User not found"

      });

    }

    // Generate 6 digit OTP

    const otp = otpGenerator.generate(6, {

      upperCaseAlphabets: false,

      lowerCaseAlphabets: false,

      specialChars: false,

      digits: true

    });

    // Expiry Time

    const expires_at = new Date(

      Date.now() +

      Number(process.env.OTP_EXPIRE) *

      60 *

      1000

    );

    // Save OTP

    await saveOTP(

      email,

      otp,

      expires_at

    );

    // Send Email

    await sendEmail(

      email,

      "Password Reset OTP",

      `Your OTP is ${otp}. It is valid for ${process.env.OTP_EXPIRE} minutes.`

    );

    return res.status(200).json({

      success: true,

      message: "OTP Sent Successfully"

    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({

      success: false,

      message: "Failed To Send OTP"

    });

  }

};
// ==========================
// VERIFY OTP
// ==========================

const verifyOTP = async (req, res) => {
   console.log("==================================");
console.log("VERIFY OTP API HIT");
console.log(req.body);
console.log("==================================");

  try {

    const { email, otp } = req.body;

    const otpData = await getOTP(email);

    if (!otpData) {

      return res.status(404).json({

        success: false,

        message: "OTP not found"

      });

    }

    // OTP mismatch

    if (otpData.otp !== otp) {

      return res.status(400).json({

        success: false,

        message: "Invalid OTP"

      });

    }

console.log("Current Time:", new Date().toISOString());
console.log("Expiry Time :", new Date(otpData.expires_at).toISOString());
    // Expired

    if (new Date() > new Date(otpData.expires_at)) {

      await deleteOTP(email);

      return res.status(400).json({

        success: false,

        message: "OTP Expired"

      });

    }

    return res.status(200).json({

      success: true,

      message: "OTP Verified Successfully"

    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({

      success: false,

      message: "Failed To Verify OTP"

    });

  }

};
// ==========================
// RESET PASSWORD
// ==========================

const resetPassword = async (req, res) => {

  try {

    const { email, password } = req.body;

    // Check OTP record exists

    const otpData = await getOTP(email);

    if (!otpData) {

      return res.status(400).json({

        success: false,

        message: "Please verify OTP first"

      });

    }

    // Hash password

    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password

    await pool.query(

      `
      UPDATE users

      SET password = $1

      WHERE email = $2
      `,

      [

        hashedPassword,

        email

      ]

    );

    // Delete OTP

    await deleteOTP(email);

    return res.status(200).json({

      success: true,

      message: "Password Reset Successfully"

    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({

      success: false,

      message: "Failed To Reset Password"

    });

  }

};


module.exports = {

  sendOTP,
 verifyOTP,
 resetPassword
};