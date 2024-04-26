import TravelStories from "./TravelStories";
import "./CSS/stories.css";
import { motion } from "framer-motion";

const Stories = () => {
  return (
    <div className="stories-container">
      <div className="image-background">
        <div className="black-box">
          <motion.h2 initial={{opacity: 0, y: 500}}
          animate={{opacity: 1, y: 0}}
          style={{textAlign: 'center'}}>
              Travel Stories From
              Different People Globally
          </motion.h2>
        </div>
      </div>

      {/* in here we passing a 2 props buttonState and textPos instead of these we can name it anything button state
        is used to handle a show button on different pages and text pos is used to center text on Stories page only 
        it works because any types of state which you will define in component is the indiviual for every called components */}
      <TravelStories
        headingVal={"Top Travel Stories"}
        descVal={"Explore our latest stories from our active users"}
        buttonState={false}
        textPos={"center"}
      />
    </div>
  );
};

export default Stories;
