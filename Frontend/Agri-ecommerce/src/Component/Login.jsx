import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../Service/Api";
import "../CSS/Login.css";

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const response =
          await loginUser({

            email,
            password

          });

        localStorage.setItem(
          "token",
          response.data.token
        );

        localStorage.setItem(
"user",
JSON.stringify( response.data.user)
);

window.dispatchEvent(
new Event("login")
);

if(response.data.user.role==="admin"){

navigate("/admin/dashboard");

}else{

navigate("/");

}

      }

      catch (error) {

        console.log(error);

        alert(
          error.response?.data?.message ||
          "Login Failed"
        );

      }

    };

  return (

    <div className="login-page">

      <div className="login-card">

        {/* LEFT SIDE */}

        <div className="login-left">

          <h1>
            AMARSIDDHI
          </h1>

          <p>
            KRISHI UDHYOG
          </p>

          <h2>
            Welcome Back!
          </h2>

          <span>
            Login to continue shopping
          </span>

        </div>

        {/* RIGHT SIDE */}

        <form
          className="login-form"
          onSubmit={handleSubmit}
        >

          <h2>
            Login
          </h2>

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            required
          />

          <button
            type="submit"
          >
            Login
          </button>

          <p>

            Don't have an account?

            <span
              onClick={() =>
                navigate(
                  "/register"
                )
              }
            >

              Register Here

            </span>

          </p>

        </form>

      </div>

    </div>

  );

};

export default Login;