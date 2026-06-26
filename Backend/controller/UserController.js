const { createUser, existingUser,getallUsers,getUserById,getdeleteById,getUpdateByID} =require("../model/UserModel");
const bcrypt =require("bcrypt");
const JWT =require("jsonwebtoken");


// CREATE USER (REGISTER)

const addUser = async (req, res) => {

  try {

    const {
      name,
      email,
      phone,
      password
    } = req.body;

    if (
      !name ||
      !email ||
      !phone ||
      !password
    ) {
      return res.status(400).json({
        message: "Please provide all fields"
      });
    }

    const userExists =
      await existingUser(email);

    if (userExists) {
      return res.status(400).json({
        message: "Email already registered"
      });
    }

    const hashpassword =
      await bcrypt.hash(
        password,
        10
      );

    const user =
      await createUser(
        name,
        email,
        phone,
        hashpassword
      );

    res.status(201).json({
      message:
        "User created successfully",
      user
    });

  } catch (e) {

    res.status(500).json({
      message:
        "Error creating user",
      error:
        e.message
    });

  }

};


// LOGIN USER

const login = async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;

    if (
      !email ||
      !password
    ) {

      return res.status(400).json({
        message:
          "Please provide email and password"
      });

    }

    const user =
      await existingUser(email);

    if (!user) {

      return res.status(404).json({
        message:
          "Email not registered"
      });

    }

    const isMatched =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatched) {

      return res.status(400).json({
        message:
          "Password does not match"
      });

    }

    const token =
      JWT.sign(

        {
          id: user.id,
          email: user.email
        },

        process.env.JWT_SECRET,

        {
          expiresIn: "1d"
        }

      );

    res.status(200).json({

      message:
        "Login successful",

      token,

      user: {

        id:
          user.id,

        name:
          user.name,

        email:
          user.email,

        phone:
          user.phone

      }

    });

  } catch (e) {

    res.status(500).json({
      message:
        "Login failed",
      error:
        e.message
    });

  }

};


// GET ALL USERS

const getallUserFromTheDB =
  async (req, res) => {

    try {

      const users =
        await getallUsers();

      res.status(200).json({

        message:
          "Users fetched successfully",

        users

      });

    } catch (e) {

      res.status(500).json({

        message:
          "Failed to fetch users",

        error:
          e.message

      });

    }

  };


// GET USER BY ID

const getUserByIDDB =
  async (req, res) => {

    try {

      const { id } =
        req.params;

      const user =
        await getUserById(id);

      if (!user) {

        return res.status(404).json({

          message:
            "User not found"

        });

      }

      res.status(200).json({

        message:
          "User fetched successfully",

        user

      });

    } catch (e) {

      res.status(500).json({

        message:
          "Failed to fetch user",

        error:
          e.message

      });

    }

  };


// UPDATE USER

const getUpdateByIDDB =
  async (req, res) => {

    try {

      const { id } =
        req.params;

      const {
        name,
        phone
      } = req.body;

      const user =
        await getUpdateByID(
          id,
          name,
          phone
        );

      if (!user) {

        return res.status(404).json({

          message:
            "User not found"

        });

      }

      res.status(200).json({

        message:
          "User updated successfully",

        user

      });

    } catch (e) {

      res.status(500).json({

        message:
          "Failed to update user",

        error:
          e.message

      });

    }

  };


// DELETE USER

const getUserdeleteByIDDB =
  async (req, res) => {

    try {

      const { id } =
        req.params;

      const user =
        await getdeleteById(id);

      if (!user) {

        return res.status(404).json({

          message:
            "User not found"

        });

      }

      res.status(200).json({

        message:
          "User deleted successfully",

        user

      });

    } catch (e) {

      res.status(500).json({

        message:
          "Failed to delete user",

        error:
          e.message

      });

    }

  };



module.exports = {

  addUser,

  login,

  getallUserFromTheDB,

  getUserByIDDB,

  getUpdateByIDDB,

  getUserdeleteByIDDB

};