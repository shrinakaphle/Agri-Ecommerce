import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import { toast } from "react-toastify";
import { sendOTP } from "../Service/Api";
import "../CSS/ForgotPassword.css";

const ForgotPassword = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSendOTP = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response = await sendOTP({ email });

      toast.success(response.data.message);

      navigate("/verify-otp", {

        state: { email }

      });

    } catch (error) {

      toast.error(

        error.response?.data?.message ||

        "Failed to send OTP"

      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="forgot-page">

      <div className="forgot-card">

        <h2>Forgot Password</h2>

        <p>

          Enter your registered email address.

          We'll send you a 6-digit OTP.

        </p>

        <form onSubmit={handleSendOTP}>

          <div className="forgot-input">

            <FaEnvelope className="forgot-icon" />

            <input

              type="email"

              placeholder="Enter Email"

              value={email}

              onChange={(e) => setEmail(e.target.value)}

              required

            />

          </div>

          <button

            type="submit"

            disabled={loading}

          >

            {

              loading

              ?

              "Sending..."

              :

              "Send OTP"

            }

          </button>

        </form>

        <span

          className="back-login"

          onClick={() => navigate("/login")}

        >

          ← Back to Login

        </span>

      </div>

    </div>

  );

};

export default ForgotPassword;