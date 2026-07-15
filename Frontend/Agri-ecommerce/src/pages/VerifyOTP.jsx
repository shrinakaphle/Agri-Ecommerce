import { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { verifyOTP, sendOTP } from "../Service/Api";
import "../CSS/VerifyOTP.css";

const VerifyOTP = () => {

  const navigate = useNavigate();

  const location = useLocation();

  const email = location.state?.email;

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const [loading, setLoading] = useState(false);

  const inputs = useRef([]);

  const handleChange = (value, index) => {

    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];

    newOtp[index] = value;

    setOtp(newOtp);

    if (value && index < 5) {

      inputs.current[index + 1].focus();

    }

  };

  const handleKeyDown = (e, index) => {

    if (

      e.key === "Backspace" &&

      !otp[index] &&

      index > 0

    ) {

      inputs.current[index - 1].focus();

    }

  };

  const handleVerify = async () => {

    const code = otp.join("");

    if (code.length !== 6) {

      return toast.error("Enter 6 digit OTP");

    }

    try {

      setLoading(true);

      const res = await verifyOTP({

        email,

        otp: code

      });

      toast.success(res.data.message);

      navigate("/reset-password", {

        state: { email }

      });

    } catch (error) {

      toast.error(

        error.response?.data?.message ||

        "Invalid OTP"

      );

    } finally {

      setLoading(false);

    }

  };

  const resendOTP = async () => {

    try {

      await sendOTP({ email });

      toast.success("OTP Resent Successfully");

    } catch {

      toast.error("Failed to resend OTP");

    }

  };

  return (

    <div className="otp-page">

      <div className="otp-card">

        <h2>Verify OTP</h2>

        <p>

          Enter the 6-digit code sent to

          <br />

          <strong>{email}</strong>

        </p>

        <div className="otp-inputs">

          {otp.map((digit, index) => (

            <input

              key={index}

              ref={(el) =>

                (inputs.current[index] = el)

              }

              value={digit}

              onChange={(e) =>

                handleChange(

                  e.target.value,

                  index

                )

              }

              onKeyDown={(e) =>

                handleKeyDown(

                  e,

                  index

                )

              }

              maxLength={1}

            />

          ))}

        </div>

        <button

          onClick={handleVerify}

          disabled={loading}

        >

          {

            loading

              ? "Verifying..."

              : "Verify OTP"

          }

        </button>

        <span

          className="resend-link"

          onClick={resendOTP}

        >

          Resend OTP

        </span>

      </div>

    </div>

  );

};

export default VerifyOTP;