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
  const navigate = useNavigate()

  const handleRegister = () => {
    const userData = {
      username: userName,
      gmail: email,
      password: password,
    };

    setLoading(true)

    handleCheckGmail();

    axios
      .post("https://travelpulse.onrender.com/register/", userData)
      .then((response) => {
        // Handle successful response
        console.log('Registered User Succesfully')
        navigate('/')
      })
      .catch((error) => {
        // Handle error
        console.error("Error:", error);
      });
  };

  const handleCheckGmail = () => {
    // Check if the email ends with '@gmail.com'
    if (email.endsWith("@gmail.com")) {
    console.log("correct");
  } else {
    console.log("incorrect");
  }
};

  return (
    <div className="registration-container">
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
      />

{loading && (
        <div className="loading-container">
          Loading
          <div className="circle">
            <div className="circle2"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
