const pool = require("../database/db");

// ==========================
// SAVE OTP
// ==========================

const saveOTP = async (email, otp, expires_at) => {

  await pool.query(

    `
    DELETE FROM password_reset_otp

    WHERE email = $1
    `,

    [email]

  );

  const result = await pool.query(

    `
    INSERT INTO password_reset_otp

    (email, otp, expires_at)

    VALUES ($1,$2,$3)

    RETURNING *
    `,

    [
      email,
      otp,
      expires_at
    ]

  );

  return result.rows[0];

};

// ==========================
// GET OTP
// ==========================

const getOTP = async (email) => {

  const result = await pool.query(

    `
    SELECT *

    FROM password_reset_otp

    WHERE email=$1

    LIMIT 1
    `,

    [email]

  );

  return result.rows[0];

};

// ==========================
// DELETE OTP
// ==========================

const deleteOTP = async (email) => {

  await pool.query(

    `
    DELETE FROM password_reset_otp

    WHERE email=$1
    `,

    [email]

  );

};

module.exports = {

  saveOTP,

  getOTP,

  deleteOTP

};