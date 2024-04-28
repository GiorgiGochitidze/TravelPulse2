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
      .post("https://travelpulse.onrender.com/loadBlogStories")
      .then((response) => {
        // Set the storiesData state with the fetched data
        setStoriesData(response.data);

        // Initialize likes, colors, and liked state based on fetched data
        const initialLikes = response.data.map((story) => story.likes);
        const initialLiked = response.data.map((story) => story.liked || false);
        setLikes(initialLikes);
        setLiked(initialLiked);
        setColors(initialLiked.map((isLiked) => (isLiked ? "red" : "white")));
      })
      .catch((error) => {
        console.error("Error fetching blog stories:", error);
      });
  }, []);

  const handleLike = async (index) => {
    // Toggle the liked state for the clicked post
    const newLiked = [...liked];
    newLiked[index] = !newLiked[index];
    setLiked(newLiked);

    // Update the like count based on the liked state
    const newLikes = [...likes];
    newLikes[index] = newLiked[index] ? likes[index] + 1 : likes[index] - 1;
    setLikes(newLikes);

    // Toggle the color based on the liked state
    const newColors = [...colors];
    newColors[index] = newLiked[index] ? "red" : "white";
    setColors(newColors);

    const storyId = storiesData[index]._id;

    try {
      // Send the like status along with the story ID to the server
      await axios.post("https://travelpulse.onrender.com/likeStory", {
        storyId: storyId,
        liked: newLiked[index], // Send the updated like status
      });
      console.log("Like action sent successfully");
    } catch (error) {
      console.error("Error sending like action:", error);
      // If there's an error, revert the changes made to the state
      setLiked([...liked]);
      setLikes([...likes]);
      setColors([...colors]);
      // You can also display an error message to the user
    }
  };

  return (
    <>
      {storiesData.map((story, index) => (
        <div key={index} className="travelstories-card">
          <div style={{ position: "relative" }}>
            <img
              data-aos="fade-in"
              data-aos-delay={index + "00"}
              src={`https://travelpulse.onrender.com/${story.img}`}
              className="image"
              alt="croatia img"
            />
            {rateContainer && (
              <FaHeart
                onClick={() => handleLike(index)}
                onMouseEnter={() =>
                  setColors((prevColors) =>
                    prevColors.map((color, i) =>
                      i === index ? (liked[index] ? "white" : "red") : color
                    )
                  )
                }
                onMouseLeave={() =>
                  setColors((prevColors) =>
                    prevColors.map((color, i) =>
                      i === index ? (liked[index] ? "red" : "white") : color
                    )
                  )
                }
                size={25}
                className="heart-icon"
                style={{ color: colors[index] }}
                // Disable the like button if the card has already been liked
                disabled={liked[index]}
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
