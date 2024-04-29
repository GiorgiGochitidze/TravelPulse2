import { useState } from "react";
import "./CSS/destinationspage.css";
import SearchBar from "./SearchBar";
import { motion } from "framer-motion";

const DestinationPage = () => {
  const [addDestination, setAddDestination] = useState(false);

  return (
    <div className="destinationspage-container">
      <div className="landing-image-container">
        <div className="black-box">
          <motion.h2
            initial={{ opacity: 0, y: 500 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.span
              initial={{ opacity: 0, y: -500 }}
              transition={{ delay: 0.3 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Discovering The Wonders
            </motion.span>{" "}
            <motion.span
              initial={{ opacity: 0, y: 500 }}
              transition={{ delay: 0.4 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Of Our Planet,
            </motion.span>{" "}
            <motion.span
              initial={{ opacity: 0, y: -500 }}
              transition={{ delay: 0.5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              One Adventure At A Time
            </motion.span>
          </motion.h2>
        </div>
      </div>

      {!addDestination && <SearchBar />}
    </div>
  );
};

export default DestinationPage;
