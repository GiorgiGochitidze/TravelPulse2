import "./CSS/register.css";
import Form from "./Form";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LogIn = ({ userName, setLoggedIn, setUserName }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleLogIn = () => {
    if (!userName || !email || !password) {
      setErrorMessage("All fields are required"); // Set error message
      setTimeout(() => {
        setErrorMessage("");
      }, 1500);
      console.error("All fields are required");
      return; // Exit early if any field is empty
    }

    if (!handleCheckGmail()) {
      setErrorMessage("Incorrect email format");
      setTimeout(() => {
        setErrorMessage("");
      }, 1500);
      console.error("Incorrect email format");
      return; // Exit early if email is incorrect
    }

    // Prepare user data
    const userData = {
      username: userName,
      gmail: email,
      password: password,
    };

    setLoading(true);

    // Make a POST request to login endpoint
    axios
      .post("http://localhost:5000/login/", userData)
      .then((response) => {
        const { token } = response.data;

        sessionStorage.setItem("token", token);

        const decoded = jwtDecode(token);

        console.log(decoded.username);

        navigate("/");

        window.location.reload();

        setLoggedIn(true);
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          setErrorMessage(error.response.data.message); // Set error message from response
          setTimeout(() => {
            setErrorMessage("");
          }, 1500);
          console.error("Error:", error.response.data.message);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("Error:", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error:", error.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCheckGmail = () => {
    // Check if the email ends with '@gmail.com'
    return email.endsWith("@gmail.com");
  };

  return (
    <div className="registration-container">
      <Form
        heading={"Welcome Back"}
        inputName={"Name"}
        inputGmail={"Gmail"}
        inputPassword={"Password"}
        handleFormSubmit={handleLogIn}
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
          Logging to your account
          <div className="circle">
            <div className="circle2"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogIn;
