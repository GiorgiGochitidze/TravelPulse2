import Form from "./Form";
import "./CSS/register.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!userName || !email || !password) {
      setErrorMessage("All fields are required"); // Set error message
      setTimeout(() => {
        setErrorMessage(false)
      }, 1500)
      console.error("All fields are required");
      return; // Exit early if any field is empty
    } else {
      setErrorMessage(""); // Clear error message if all fields are filled
    }

    if (!handleCheckGmail()) {
      setErrorMessage("Incorrect email format");
      setTimeout(() => {
        setErrorMessage("");
      }, 1500);
      console.error("Incorrect email format");
      return; // Exit early if email is incorrect
    }
  

    const userData = {
      username: userName,
      gmail: email,
      password: password,
    };

    setLoading(true);
    
    handleCheckGmail();
    
    axios
      .post("https://travelpulse.onrender.com/register/", userData)
      .then((response) => {
        // Handle successful response
        console.log("Registered User Successfully");
        setTimeout(() => {
          navigate("/LogIn");
        }, 1500);
      })
      .catch((error) => {
        // Handle error
        console.error("Error:", error);
      });
  };

  const handleCheckGmail = () => {
    // Check if the email ends with '@gmail.com'
    return email.endsWith("@gmail.com");
  };

  return (
    <div className="registration-container">
      {/* Error message */}

      <Form
        handleFormSubmit={handleRegister}
        heading={"Hi, Get Started Now"}
        inputName={"Name"}
        inputGmail={"Gmail"}
        inputPassword={"Password"}
        userName={userName}
        email={email}
        password={password}
        setPassword={setPassword}
        setUserName={setUserName}
        setEmail={setEmail}
        errorMessage={errorMessage}
      />

      {loading && (
        <div className="loading-container">
          Registered successfully. You are being redirected to the login page.
          <div className="circle">
            <div className="circle2"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
