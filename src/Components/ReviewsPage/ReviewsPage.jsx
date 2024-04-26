import "./CSS/reviewspage.css";
import TravelStories from "../StoriesPage/TravelStories.jsx";
import { useState } from "react";
import { motion } from "framer-motion";

const ReviewsPage = () => {
  const [showUpload, setShowUpload] = useState(false);

  return (
    <div className="reviewspage-container">
      <div className="landingimage-container">
        <div className="black-box">
          <motion.h2 initial={{opacity: 0, y: 500}}
          animate={{opacity: 1, y: 0}}
          style={{ textAlign: "center", fontSize: "50px" }}>
            Share your Travel Experience in <br /> form of a story
          </motion.h2>
        </div>
      </div>

      <TravelStories
        rateContainer={true}
        headingVal={"Top places with reviews"}
        descVal={"Travelers want to see more reviews of these places."}
        ReviewBtn={true}
        setShowUpload={setShowUpload}
        showUpload={showUpload}
      />

      
    </div>
  );
};

export default ReviewsPage;
