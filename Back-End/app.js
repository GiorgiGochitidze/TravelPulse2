const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const multer = require("multer");
const fs = require("fs");
const PORT = 5000;
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("./User");
require("dotenv").config();
const StoriesSchema = require("./StoriesData");
const Card = require("./DestinationsCard");
const { v2: cloudinary } = require("cloudinary");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Remove the multer diskStorage configuration
const upload = multer();

// app.use("/uploads", express.static("uploads"));

const passwordDB = process.env.USERPASS;
const ApiSecretKey = process.env.CLOUDINARY_APISECRET;

const uri = `mongodb+srv://giorgigochitidze5555:${passwordDB}@cluster0.rpheryv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

cloudinary.config({
  cloud_name: "dkjabjayn",
  api_key: "634984545767666",
  api_secret: ApiSecretKey,
});

// if you want to connect to a specified database after url you need to write /and here database name for example 27017/Users
// otherwise it will navigate everything to test database which is set as default database
mongoose
  .connect("mongodb://localhost:27017/TravelPulse")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

app.get("/", (req, res) => {
  res.status(200).send(`<h1>Hello World</h1>`);
});
// function to generate random string for secret key in jwt token
const generateRandomString = (length) => {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_";
  let randomString = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    randomString += charset[randomIndex];
  }
  return randomString;
};

const secretKey = generateRandomString(64);

const generateToken = (user) => {
  return jwt.sign({ username: user.username }, secretKey, {
    expiresIn: "2h",
  });
};


app.post("/createBlogStories", upload.single("image"), (req, res) => {
  const { country, publish_date, title, content, author } = req.body;

  // Upload image to Cloudinary
  cloudinary.uploader.upload(req.file.path, { folder: "blog_images" }, (error, result) => {
    if (error) {
      console.error("Error uploading image to Cloudinary:", error);
      return res.status(500).send("Internal Server Error");
    }

    // Create a new story instance with the Cloudinary image URL
    const newStory = new StoriesSchema({
      img: result.secure_url,
      country: country,
      publish_date: publish_date,
      title: title,
      content: content,
      liked: [],
      author: author,
    });

    // Save the new story to the database
    newStory
      .save()
      .then(() => {
        console.log("New story added successfully");
        res.status(200).send("New story added successfully");
      })
      .catch((err) => {
        console.error("Error adding new story:", err);
        res.status(500).send("Internal Server Error");
      });
  });
});

app.post("/loadBlogStories", async (req, res) => {
  const { username } = req.body;

  try {
    const likedUser = await User.findOne({ username: username });

    if (!likedUser) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    StoriesSchema.find({})
      .then((stories) => {
        res.status(200).json({ stories: stories, userLiked: likedUser.liked });
      })
      .catch((err) => {
        console.error("Error loading blog stories:", err);
        res.status(500).send("Internal Server Error");
      });
  } catch (error) {
    console.error("Error finding user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/login", (req, res) => {
  const { username, gmail, password } = req.body;

  User.findOne({ username, gmail })
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .json({ error: "User not found", message: "User Not Found" });
      }

      bcrypt
        .compare(password, user.password)
        .then((isMatch) => {
          if (isMatch) {
            // Generate token after verifying password
            const token = generateToken({ username: user.username });

            // Send token along with the response
            res.status(200).json({ message: "Login successful", token });
          } else {
            res.status(401).json({ message: "Invalid password" });
          }
        })
        .catch((err) => {
          // Error occurred while comparing passwords
          console.error("Error comparing passwords:", err);
          res.status(500).json({ error: "Internal Server Error" });
        });
    })
    .catch((err) => {
      // Error occurred while finding the user
      console.error("Error finding user:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

app.post("/register", (req, res) => {
  const { username, gmail, password } = req.body;

  // Check if the username or email already exists in the database
  User.findOne({ $or: [{ username }, { gmail }] })
    .then((existingUser) => {
      if (existingUser) {
        // If the username or email already exists, send an error response
        return res.status(400).send("Username or email already exists");
      }

      // If the username and email are unique, hash the password and register the new user
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
          return res.status(500).send("Internal Server Error");
        }

        // Create a new user instance with the hashed password
        const newUser = new User({
          username,
          gmail,
          password: hash,
          liked: [],
          author: "",
        });

        // Save the new user to the database
        newUser
          .save()
          .then(() => {
            console.log("User registered successfully");
            res.status(200).send("User registered successfully");
          })
          .catch((err) => {
            console.error("Error registering user:", err);
            res.status(500).send("Internal Server Error");
          });
      });
    })
    .catch((err) => {
      console.error("Error checking existing user:", err);
      res.status(500).send("Internal Server Error");
    });
});

app.post("/likeStory", async (req, res) => {
  const { storyId, username } = req.body;

  try {
    const currentUser = await User.findOne({ username });
    const currentPost = await StoriesSchema.findOne({ _id: storyId });

    if (!currentUser) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the current post is already liked by the current user
    if (currentUser.liked.includes(storyId)) {
      // Remove the post from the user's liked array
      await currentUser.updateOne({ $pull: { liked: storyId } });

      // Remove the user from the post's liked array
      await currentPost.updateOne({ $pull: { liked: currentUser._id } });

      console.log("Removed story from liked list");
      return res.status(200).json({ message: "Removed post from liked list" });
    }

    // Add the post to the user's liked array
    await currentUser.updateOne({ $addToSet: { liked: storyId } });

    // Add the user to the post's liked array
    await currentPost.updateOne({ $addToSet: { liked: currentUser._id } });

    console.log("Added story to liked list");
  } catch (err) {
    console.log("Internal Server error", err);
    res.status(500).send("Internal Server error");
  }
});

app.post("/deleteStory", async (req, res) => {
  const { storyId } = req.body;

  try {
    // Find the story by ID
    const story = await StoriesSchema.findById(storyId);

    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    // Extract the public ID from the Cloudinary URL
    const cloudinaryPublicId = story.img.split("/").pop().split(".")[0];

    // Delete image from Cloudinary
    cloudinary.uploader.destroy(cloudinaryPublicId, async (error, result) => {
      if (error) {
        console.error("Error deleting image from Cloudinary:", error);
        return res.status(500).send("Internal Server Error");
      }

      console.log("Image deleted from Cloudinary");

      // Delete the story from the database
      try {
        await StoriesSchema.findByIdAndDelete(storyId);
        console.log("Story deleted successfully");
        res.status(200).json({ message: "Story deleted successfully" });
      } catch (err) {
        console.error("Error deleting story:", err);
        res.status(500).send("Internal Server Error");
      }
    });
  } catch (err) {
    console.error("Error finding story:", err);
    res.status(500).send("Internal Server Error");
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
