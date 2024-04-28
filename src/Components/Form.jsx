import "./CSS/form.css";
import { motion } from "framer-motion";

const Form = ({ errorMessage, heading, inputName, handleFormSubmit, inputGmail, inputPassword, userName, email, password, setUserName, setEmail, setPassword }) => {

  return (
    <motion.div
      initial={{ opacity: 0, width: 0, height: 0 }}
      animate={{
        opacity: 1,
        width: ["500px", "100px", "400px"],
        height: "auto",
      }}
      className="authorization-card"
    >
      <motion.h1
      initial={{ opacity: 0, y: 500 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3}}
        style={{
          marginBottom: "20px",
          textAlign: "center",
          marginTop: "20px",
          color: "white",
        }}
      >
        {heading}
      </motion.h1>

      <div className="fields-container">
        <motion.label
          initial={{ opacity: 0, y: 500 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          htmlFor="username"
        >
          <input
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder={inputName}
            id="username"
            name="username"
            type="text"
          />
        </motion.label>

        <motion.label
          initial={{ opacity: 0, y: 500 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          htmlFor="email"
        >
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={inputGmail}
            id="email"
            name="email"
            type="email"
          />
        </motion.label>

        <motion.label
          initial={{ opacity: 0, y: 500 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          htmlFor="password"
        >
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={inputPassword}
            id="password"
            name="password"
            type="password"
          />
        </motion.label>

        {errorMessage && <p style={{color: 'white'}}>{errorMessage}</p>}

        <motion.button
          initial={{ opacity: 0, y: 500 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          onClick={handleFormSubmit}
          className="submit-btn"
        >
          Submit
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Form;
