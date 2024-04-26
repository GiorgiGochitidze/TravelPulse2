import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";


const TravelStoriesCard = ({ rateContainer }) => {
  // Initialize likes, colors, and liked state
  const [likes, setLikes] = useState([]);
  const [colors, setColors] = useState([]);
  const [liked, setLiked] = useState([]);

  // Initialize storiesData state
  const [storiesData, setStoriesData] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:5000/loadBlogStories") // Assuming the endpoint is /blogStories
      .then((response) => {
        // Check if response.data is an array before setting state
        // Set the storiesData state with the fetched data
        setStoriesData(response.data);

        // Initialize likes, colors, and liked state arrays based on the length of fetched data
        setLikes(new Array(response.data.length).fill(0));
        setColors(new Array(response.data.length).fill("white"));
        setLiked(new Array(response.data.length).fill(false));
      })
      .catch((error) => {
        console.error("Error fetching blog stories:", error);
      });
  }, []);

  const handleLike = (index) => {
    // Toggle the liked state for the clicked card
    const newLiked = [...liked];
    newLiked[index] = !newLiked[index];

    // Update the state with the new liked state
    setLiked(newLiked);

    // Update the likes count based on the liked state
    const newLikes = [...likes];
    newLikes[index] = newLiked[index] ? likes[index] + 1 : likes[index] - 1;

    // Update the color for the clicked card
    const newColors = [...colors];
    newColors[index] = newLiked[index] ? "red" : "white";

    // Update the state with the new like count and colors
    setLikes(newLikes);
    setColors(newColors);
  };


  return (
    <>
      {storiesData.map((story, index) => (
        <div key={index} className="travelstories-card">
          <div style={{ position: "relative" }}>
            <img
              data-aos="fade-in"
              data-aos-delay={index + "00"}
              src={`http://localhost:5000/${story.img}`}
              className="image"
              alt="croatia img"
            />
            {rateContainer && (
              <FaHeart
                onClick={() => handleLike(index)}
                onMouseEnter={() =>
                  setColors((colors) =>
                    colors.map((color, i) => (i === index ? "red" : color))
                  )
                }
                onMouseLeave={() =>
                  setColors((colors) =>
                    colors.map((color, i) => (i === index ? "white" : color))
                  )
                }
                size={25}
                className="heart-icon"
                style={{ color: colors[index] }}
                disabled={liked[index]} // Disable the like button if the card has already been liked
              />
            )}
          </div>
          <div className="travelstories-date-container">
            <p data-aos="fade-up" data-aos-delay={index + "00"}>
              {story.country}
            </p>
            <p data-aos="fade-up" data-aos-delay={index + "05"}>
              {story.publish_date}
            </p>
          </div>
          <h2 data-aos="fade-up" data-aos-delay={index + "10"}>
            {story.title}
          </h2>
          <p data-aos="fade-up" data-aos-delay={index + "15"}>
            {story.content}
          </p>

          {rateContainer && <p>Likes: {likes[index]}</p>}
        </div>
      ))}
    </>
  );
};

export default TravelStoriesCard;
