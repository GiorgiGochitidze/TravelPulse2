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
const { MongoClient, ServerApiVersion } = require("mongodb");
const StoriesSchema = require("./StoriesData");
const Card = require("./DestinationsCard");
const { v2: cloudinary } = require('cloudinary');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/uploads", express.static("uploads"));

const passwordDB = process.env.USERPASS;
const ApiSecretKey = process.env.CLOUDINARY_APISECRET

const uri = `mongodb+srv://giorgigochitidze5555:${passwordDB}@cluster0.rpheryv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

          
cloudinary.config({ 
  cloud_name: 'dkjabjayn', 
  api_key: '634984545767666',
  api_secret: ApiSecretKey
});

// if you want to connect to a specified database after url you need to write /and here database name for example 27017/Users
// otherwise it will navigate everything to test database which is set as default database
mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

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

app.post("/createBlogStories", upload.single('image'), (req, res) => {
  const { country, publish_date, title, content } = req.body;

  // Assuming multer middleware saves the uploaded image to req.file
  const imagePathInUploads = req.file ? req.file.path : null;

  // Upload image to Cloudinary
  cloudinary.uploader.upload(imagePathInUploads, { folder: "blog_images" }, (error, result) => {
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
    });

    // Save the new story to the database
    newStory.save()
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

app.post("/loadBlogStories", (req, res) => {
  StoriesSchema.find({})
    .then((stories) => {
      res.status(200).json(stories);
    })
    .catch((err) => {
      console.error("Error loading blog stories:", err);
      res.status(500).send("Internal Server Error");
    });
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
        const newUser = new User({ username, gmail, password: hash });

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

app.post("/likeStory", (req, res) => {
  const { storyId, liked } = req.body;

  // Find the corresponding story in the StoriesSchema
  StoriesSchema.findById(storyId)
    .then((story) => {
      if (!story) {
        return res.status(404).json({ error: "Story not found" });
      }

      // Update the like count based on the like status sent from the client
      story.likes += liked ? 1 : -1;

      // Save the updated story document
      return story.save();
    })
    .then(() => {
      res.status(200).json({ message: "Like status updated successfully" });
    })
    .catch((err) => {
      console.error("Error updating like status:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
