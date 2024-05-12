import { RiPencilFill } from "react-icons/ri";
import "../CSS/travelstories.css";
import StoriesList from "./StoriesList";
import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const TravelStories = ({
  setShowUpload,
  showUpload,
  buttonState,
  textPos,
  headingVal,
  descVal,
  ReviewBtn,
}) => {
  const [image, setImage] = useState(null);
  const [country, setCountry] = useState("");
  // const [city, setCity] = useState('');
  const [publishDate, setPublishDate] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleAddPost = () => {
    if (!image || !country || !publishDate || !title || !content) {
      // If any required field is missing, display an error message
      alert("Please fill in all the required fields.");
      return; // Exit the function early
    }

    // Create FormData object
    const formData = new FormData();
    formData.append("image", image);
    formData.append("country", country);
    formData.append("publish_date", publishDate);
    formData.append("title", title);
    formData.append("content", content);

    axios
      .post("http://localhost:5000/createBlogStories", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Post added successfully:", response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error adding post:", error);
      });
  };

  return (
    <div className="travelstories-container">
      <div className="travelstories-heading-container">
        <div>
          {/* giving a value to a texts style text align center but only in this calling page where we call current component  example in Stories.jsx */}
          <motion.h1
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: [0, 1.5, 1] }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            style={{ textAlign: textPos }}
          >
            {headingVal}
          </motion.h1>
          <br />
          <motion.p
            initial={{ opacity: 0, x: 500 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: textPos }}
          >
            {descVal}
          </motion.p>
        </div>
        {/* we getting a buttonState as props to handle a showing current button in different places of calling Travel
        stories Component on home page button is shown on stories page its value is false */}
        {buttonState && (
          <button
            data-aos="fade-left"
            data-aos-delay="300"
            className="travelstories-btn"
          >
            View All Stories
          </button>
        )}
        {ReviewBtn && (
          <button
            data-aos="fade-up"
            data-aos-delay="200"
            onClick={() =>
              showUpload ? setShowUpload(false) : setShowUpload(true)
            }
            className="travelstories-btn"
          >
            <RiPencilFill className="pencilicon" size={20} /> Write New Review
          </button>
        )}
      </div>
      {!showUpload && <StoriesList />}

      {showUpload && (
        <div className="upload-image-container">
          <div className="image-dropbox-container">
            <div className="image-dropbox">
              <input
                type="file"
                name="file"
                id="file"
                onChange={handleFileChange}
                required
              />

              {/* Show the selected image */}
              {image && (
                <img
                  className="choosen-img"
                  src={URL.createObjectURL(image)}
                  alt={image.name}
                />
              )}
              <label htmlFor="file" className="custom-button">
                Choose File
              </label>
            </div>
          </div>

          <div className="form-container">
            <div className="name-desc-container">
                <label htmlFor="location">
                  <input
                    id="location"
                    placeholder="Enter Travel Location"
                    name="location"
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                  />
                </label>
              <label htmlFor="date">
                  <input
                    id="date"
                    name="date"
                    required
                    type="date"
                    value={publishDate}
                    onChange={(e) => setPublishDate(e.target.value)}
                  />
                </label>
                <label htmlFor="title">
                  <input
                    id="title"
                    name="title"
                    placeholder="Title of review"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </label>

                
                <label htmlFor="description">
                  <textarea
                  style={{marginTop: '20px'}}
                    placeholder="A detailed review of your Travel Journey. Travellers will love to know your experience"
                    name="description"
                    id="description"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                  ></textarea>
                </label>
            </div>
            <button onClick={handleAddPost} className="submit-btn">
              Add Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelStories;
