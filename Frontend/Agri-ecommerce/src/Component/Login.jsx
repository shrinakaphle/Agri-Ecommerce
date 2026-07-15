// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { loginUser } from "../Service/Api";
// import "../CSS/Login.css";

// const Login = () => {

//   const navigate = useNavigate();

//   const [email, setEmail] =
//     useState("");

//   const [password, setPassword] =
//     useState("");

//   const handleSubmit =
//     async (e) => {

//       e.preventDefault();

//       try {

//         const response =
//           await loginUser({

//             email,
//             password

//           });

//         localStorage.setItem(
//           "token",
//           response.data.token
//         );

//         localStorage.setItem(
// "user",
// JSON.stringify( response.data.user)
// );

// window.dispatchEvent(
// new Event("login")
// );

// if(response.data.user.role==="admin"){

// navigate("/admin/dashboard");

// }else{

// navigate("/");

// }

//       }

//       catch (error) {

//         console.log(error);

//         alert(
//           error.response?.data?.message ||
//           "Login Failed"
//         );

//       }

//     };

//   return (

//     <div className="login-page">

//       <div className="login-card">

//         {/* LEFT SIDE */}

//         <div className="login-left">

//           <h1>
//             AMARSIDDHI
//           </h1>

//           <p>
//             KRISHI UDHYOG
//           </p>

//           <h2>
//             Welcome Back!
//           </h2>

//           <span>
//             Login to continue shopping
//           </span>

//         </div>

//         {/* RIGHT SIDE */}

//         <form
//           className="login-form"
//           onSubmit={handleSubmit}
//         >

//           <h2>
//             Login
//           </h2>

//           <input
//             type="email"
//             placeholder="Email Address"
//             value={email}
//             onChange={(e) =>
//               setEmail(
//                 e.target.value
//               )
//             }
//             required
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) =>
//               setPassword(
//                 e.target.value
//               )
//             }
//             required
//           />

//           <button
//             type="submit"
//           >
//             Login
//           </button>

//           <p>

//             Don't have an account?

//             <span
//               onClick={() =>
//                 navigate(
//                   "/register"
//                 )
//               }
//             >

//               Register Here

//             </span>

//           </p>

//         </form>

//       </div>

//     </div>

//   );

// };

// export default Login;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash
} from "react-icons/fa";
import { loginUser } from "../Service/Api";
import "../CSS/Login.css";

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await loginUser({

        email,
        password

      });

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      window.dispatchEvent(
        new Event("login")
      );

      if (response.data.user.role === "admin") {

        navigate("/admin/dashboard");

      } else {

        navigate("/");

      }

    } catch (error) {

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

        {/* LEFT */}

        <div className="login-left">

          <h1>AMARSIDDHI</h1>

          <p>KRISHI UDHYOG</p>

          <h2>Welcome Back 👋</h2>

          <span>

            High Quality Animal Feed For Every Farm

          </span>

          <ul className="login-features">

            <li>✓ Secure Login</li>

            <li>✓ Easy Shopping</li>

            <li>✓ Fast Delivery</li>

            <li>✓ Trusted Products</li>

          </ul>

        </div>

        {/* RIGHT */}

        <form
          className="login-form"
          onSubmit={handleSubmit}
        >

          <h2>Login</h2>

          <p className="login-subtitle">

            Login to continue shopping

          </p>

          {/* EMAIL */}

          <div className="input-group">

            <FaEnvelope className="input-icon" />

            <input

              type="email"

              placeholder="Email Address"

              value={email}

              onChange={(e)=>setEmail(e.target.value)}

              required

            />

          </div>

          {/* PASSWORD */}

          <div className="input-group">

            <FaLock className="input-icon" />

            <input

              type={showPassword ? "text" : "password"}

              placeholder="Password"

              value={password}

              onChange={(e)=>setPassword(e.target.value)}

              required

            />

            <span

              className="eye-icon"

              onClick={()=>setShowPassword(!showPassword)}

            >

              {

                showPassword

                ?

                <FaEyeSlash/>

                :

                <FaEye/>

              }

            </span>

          </div>

          {/* OPTIONS */}

          <div className="login-options">

            <label>

              <input

                type="checkbox"

                checked={rememberMe}

                onChange={()=>setRememberMe(!rememberMe)}

              />

              Remember Me

            </label>

            <span

              className="forgot-link"

              onClick={()=>navigate("/forgot-password")}

            >

              Forgot Password?

            </span>

          </div>

          {/* BUTTON */}

          <button

            type="submit"

            className="login-btn-modern"

          >

            Login →

          </button>

          <p className="register-text">

            Don't have an account?

            <span

              onClick={()=>navigate("/register")}

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