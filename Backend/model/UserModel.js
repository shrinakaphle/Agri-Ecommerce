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

const getUpdateByID =async(id,name,phone,address,profile_image)=>{const result =await pool.query(

`
UPDATE users
SET

name=$1,

phone=$2,

address =$3,

profile_image = COALESCE($4, profile_image)

WHERE id=$5

RETURNING *

`,

[
name,
phone,
address,
profile_image,
id
]

);

return result.rows[0];
};
const getCustomersWithOrders = async () => {

  const result = await pool.query(`
    SELECT
      users.id,
      users.name,
      users.email,
      COUNT(orders.id) AS total_orders
    FROM users
    LEFT JOIN orders
      ON users.id = orders.user_id
    GROUP BY users.id
   
  `);

  return result.rows;

};

// ================================
// GET CUSTOMER DETAILS
// ================================

const getCustomerDetails = async (id) => {

  const customerResult = await pool.query(
    `
    SELECT
      id,
      name,
      email
    FROM users
    WHERE id = $1
    `,
    [id]
  );

  const ordersResult = await pool.query(
    `
    SELECT
      id,
      total_amount,
      payment_method,
      payment_status,
      order_status,
      created_at
    FROM orders
    WHERE user_id = $1
    ORDER BY created_at DESC
    `,
    [id]
  );

  return {
    customer: customerResult.rows[0],
    orders: ordersResult.rows
  };

};


module.exports = {

createUser,

existingUser,

getallUsers,

getUserById,

getdeleteById,

getUpdateByID,

getCustomersWithOrders,

getCustomerDetails 



};