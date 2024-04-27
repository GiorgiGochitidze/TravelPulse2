import { FiMenu } from "react-icons/fi";
import "./Components/CSS/navbar.css";
import travelpulse from "./assets/travelpulseicon.png";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";

const token = sessionStorage.getItem("token");
const decoded = token ? jwtDecode(token) : 'nothing';

const Navbar = ({loggedIn, setLoggedIn}) => {
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate()

  const LinkStyles = {
    textDecoration: "none",
    color: "white",
  };

  useEffect(() => {
    if (token) {
      setLoggedIn(true);
    } else {
      console.log('Token does not exist');
    }
  }, [setLoggedIn]);

  const handleLogout = () => {
    // Remove token from sessionStorage
    sessionStorage.removeItem("token");
    // Update loggedIn state to false
    setLoggedIn(false);
    // Redirect to the home page
    navigate("/");
    window.location.reload()
  }



  return (
    <>
      <header>
        <nav>
          <motion.img
            initial={{ opacity: 0, y: 500 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ width: "50px", height: "50px" }}
            src={travelpulse}
            alt="logo icon"
          />

          <div className="navigation-list">
            <Link to={'/'} style={LinkStyles}>
              <motion.p
                initial={{ opacity: 0, y: 500 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Home
              </motion.p>
            </Link>
            <Link to="/Destinations" style={LinkStyles}>
              <motion.p
                initial={{ opacity: 0, y: 500 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Destination
              </motion.p>
            </Link>
            <Link to="/Stories" style={LinkStyles}>
              <motion.p
                initial={{ opacity: 0, y: 500 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Stories
              </motion.p>
            </Link>
            <Link to="/Reviews" style={LinkStyles}>
              <motion.p
                initial={{ opacity: 0, y: 500 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Reviews
              </motion.p>
            </Link>
          </div>

          <div className="registration-login">
            {!loggedIn && (
              <>
                <Link to="/Register" style={LinkStyles}>
                  <motion.p
                    initial={{ opacity: 0, y: 500 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    SignUp
                  </motion.p>
                </Link>

                <Link to="/LogIn" style={LinkStyles}>
                  <motion.p
                    initial={{ opacity: 0, y: 500 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    LogIn
                  </motion.p>
                </Link>
              </>
            )}

            {loggedIn && <p>Hello, {decoded.username}</p>}
            {loggedIn && <button onClick={handleLogout}>logout</button>}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 500 }}
            animate={{ opacity: 1, x: 0 }}
            className="menu-icon"
          >
            <FiMenu
              onClick={() => (menu ? setMenu(false) : setMenu(true))}
              size={25}
              color="white"
            />
          </motion.div>
        </nav>
      </header>

      {menu && (
        <div className="navbar-menu-container">
          <motion.div
            initial={{ opacity: 0, width: 0, height: 0, rotate: 0 }}
            animate={{
              opacity: 1,
              rotate: 360,
              width: [0, 400],
              height: [0, "auto"],
            }}
            transition={{
              duration: 0.3, // Duration of the animation
            }}
            className="menu-card"
          >
            <Link
              onClick={() => (menu ? setMenu(false) : setMenu(true))}
              to="/"
              style={LinkStyles}
            >
              <motion.p
                initial={{ opacity: 0, y: -300 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Home
              </motion.p>
            </Link>
            <Link
              onClick={() => (menu ? setMenu(false) : setMenu(true))}
              to="/Destinations"
              style={LinkStyles}
            >
              <motion.p
                initial={{ opacity: 0, y: -300 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Destination
              </motion.p>
            </Link>
            <Link
              onClick={() => (menu ? setMenu(false) : setMenu(true))}
              to="/Stories"
              style={LinkStyles}
            >
              <motion.p
                initial={{ opacity: 0, y: -300 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Stories
              </motion.p>
            </Link>
            <Link
              onClick={() => (menu ? setMenu(false) : setMenu(true))}
              to="/Reviews"
              style={LinkStyles}
            >
              <motion.p
                initial={{ opacity: 0, y: -300 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Reviews
              </motion.p>
            </Link>

            <Link
              onClick={() => (menu ? setMenu(false) : setMenu(true))}
              to="/Register"
              style={LinkStyles}
            >
              <motion.p
                initial={{ opacity: 0, y: -300 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                SignUp
              </motion.p>
            </Link>
            <Link
              onClick={() => (menu ? setMenu(false) : setMenu(true))}
              to="/LogIn"
              style={LinkStyles}
            >
              <motion.p
                initial={{ opacity: 0, y: -300 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                LogIn
              </motion.p>
            </Link>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Navbar;
