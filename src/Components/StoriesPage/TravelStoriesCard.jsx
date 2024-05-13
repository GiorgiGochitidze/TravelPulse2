import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const token = sessionStorage.getItem("token");
const decoded = token ? jwtDecode(token) : "token doesnt exists";

const TravelStoriesCard = () => {
  // Initialize storiesData state
  const [storiesData, setStoriesData] = useState([]);
  const [userLiked, setUserLiked] = useState([]);
  const [likesNums, setLikesNums] = useState({});

  useEffect(() => {
    axios
      .post("https://travelpulse.onrender.com/loadBlogStories", {
        username: decoded.username,
      })
      .then((response) => {
        // Set the storiesData state with the fetched data
        setStoriesData(response.data.stories);
        setUserLiked(response.data.userLiked);
        // Initialize likes numbers for each story
        const initialLikesNums = {};
        response.data.stories.forEach((story) => {
          initialLikesNums[story._id] = story.liked.length;
        });
        setLikesNums(initialLikesNums);
      })
      .catch((error) => {
        console.error("Error fetching blog stories:", error);
      });
  }, []);

  const handleLike = ({ storyId, username }) => {
    const isLiked = userLiked.includes(storyId);

    setLikesNums(() => ({
      ...likesNums,
      [storyId]: isLiked ? likesNums[storyId] - 1 : likesNums[storyId] + 1,
    }));
    setUserLiked(() => {
      if (isLiked) {
        return userLiked.filter((id) => id !== storyId);
      } else {
        return [...userLiked, storyId];
      }
    });

    axios
      .post("https://travelpulse.onrender.com/likeStory", {
        storyId: storyId,
        username: username,
      })
      .then((response) => {
        console.log("liked successfully", response.data);
      })
      .catch((err) => {
        console.log("Internal server error:", err);
      });
  };

  const handleDeletePost = (storyId) => {
    axios
      .post("https://travelpulse.onrender.com/deleteStory", {
        storyId: storyId,
      })
      .then((response) => {
        console.log("Post deleted successfully", response.data);
        // Optionally, update state to remove the deleted post from the UI
        window.location.reload()
      })
      .catch((err) => {
        console.log("Internal server error:", err);
      });
  };

  return (
    <>
      {storiesData.map((story, index) => (
        <div key={index} className="travelstories-card">
          <div style={{ position: "relative" }}>
            <img
              data-aos="fade-in"
              data-aos-delay={index + "00"}
              src={story.img}
              className="image"
              alt="croatia img"
            />
            {decoded.username === story.author && (
              <button className="del-btn" onClick={() => handleDeletePost(story._id)}>
                X
              </button>
            )}
            {token && (
              <FaHeart
                size={25}
                className="heart-icon"
                style={{
                  color: userLiked.includes(story._id) ? "red" : "white",
                }}
                onClick={() => {
                  handleLike({
                    storyId: story._id,
                    username: decoded.username,
                  });
                }}
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

          {token && <p>Likes: {likesNums[story._id]}</p>}
        </div>
      ))}
    </>
  );
};

export default TravelStoriesCard;
