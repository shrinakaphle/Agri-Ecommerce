const pool = require("../database/db");

const createUser = async (
  name,
  email,
  phone,
  password
) => {

  const result = await pool.query(

    `
    INSERT INTO users
    ( name, email, phone, password) VALUES($1,$2,$3,$4)RETURNING *`,

    [
      name,
      email,
      phone,
      password
    ]

  );

  return result.rows[0];

};

const existingUser = async (
  email
) => {

  const result =
  await pool.query(

    `
    SELECT *
    FROM users
    WHERE email=$1
    `,

    [email]

  );

  return result.rows[0];

};

const getallUsers =
async()=>{

const result =
await pool.query(

`
SELECT *
FROM users
ORDER BY id DESC
`

);

return result.rows;

};

const getUserById =
async(id)=>{

const result =
await pool.query(

`
SELECT *
FROM users
WHERE id=$1
`,

[id]

);

return result.rows[0];

};

const getdeleteById =
async(id)=>{

const result =
await pool.query(

`
DELETE FROM users
WHERE id=$1
RETURNING *
`,

[id]

);

return result.rows[0];

};

const getUpdateByID =
async(

id,
name,
phone

)=>{

const result =
await pool.query(

`
UPDATE users
SET

name=$1,

phone=$2

WHERE id=$3

RETURNING *

`,

[
name,
phone,
id
]

);

return result.rows[0];

};

module.exports = {

createUser,

existingUser,

getallUsers,

getUserById,

getdeleteById,

getUpdateByID

};