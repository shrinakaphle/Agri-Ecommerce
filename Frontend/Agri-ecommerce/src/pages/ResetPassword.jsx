import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaLock,
  FaEye,
  FaEyeSlash
} from "react-icons/fa";
import { toast } from "react-toastify";
import { resetPassword } from "../Service/Api";
import "../CSS/ResetPassword.css";

const ResetPassword = () => {

  const navigate = useNavigate();

  const location = useLocation();

  const email = location.state?.email;

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {

    e.preventDefault();

    if (password.length < 6) {

      return toast.error(

        "Password must be at least 6 characters"

      );

    }

    if (password !== confirmPassword) {

      return toast.error(

        "Passwords do not match"

      );

    }

    try {

      setLoading(true);

      const response = await resetPassword({

        email,

        password

      });

      toast.success(response.data.message);

      navigate("/login");

    } catch (error) {

      toast.error(

        error.response?.data?.message ||

        "Failed to Reset Password"

      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="reset-page">

      <div className="reset-card">

        <h2>Reset Password</h2>

        <p>

          Create a new password for

          <br />

          <strong>{email}</strong>

        </p>

        <form onSubmit={handleReset}>

          <div className="reset-input">

            <FaLock className="reset-icon" />

            <input

              type={showPassword ? "text" : "password"}

              placeholder="New Password"

              value={password}

              onChange={(e)=>setPassword(e.target.value)}

              required

            />

            <span

              className="eye"

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

          <div className="reset-input">

            <FaLock className="reset-icon" />

            <input

              type={showConfirm ? "text" : "password"}

              placeholder="Confirm Password"

              value={confirmPassword}

              onChange={(e)=>setConfirmPassword(e.target.value)}

              required

            />

            <span

              className="eye"

              onClick={()=>setShowConfirm(!showConfirm)}

            >

              {

                showConfirm

                ?

                <FaEyeSlash/>

                :

                <FaEye/>

              }

            </span>

          </div>

          <button

            type="submit"

            disabled={loading}

          >

            {

              loading

              ?

              "Updating..."

              :

              "Reset Password"

            }

          </button>

        </form>

      </div>

    </div>

  );

};

export default ResetPassword;