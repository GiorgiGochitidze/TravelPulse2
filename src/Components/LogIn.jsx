import "./CSS/register.css";
import Form from "./Form";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LogIn = ({userName, setLoggedIn, setUserName}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);


  const navigate = useNavigate();

  const handleLogIn = () => {
    // Prepare user data
    const userData = {
      username: userName,
      gmail: email,
      password: password,
    };

    setLoading(true);

    // Make a POST request to login endpoint
    axios.post("http://localhost:5000/login/", userData)
    .then((response) => {
      const {user} = response.data

      sessionStorage.setItem('token', user.token)

      const decoded = jwtDecode(user.token)

      console.log(decoded.username)

      navigate('/');

      window.location.reload()

      setLoggedIn(true)
    })
    .catch((error) => {
      console.error("Error:", error);
    })
    .finally(() => {
      setLoading(false);
    });
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

export default LogIn;
