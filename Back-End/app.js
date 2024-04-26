const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const multer = require("multer");
const fs = require("fs");
const PORT = 5000;
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/uploads", express.static("uploads"));


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

let users = [];

app.get("/", (req, res) => {
  res.status(200).send(`<h1>Hello World</h1>`);
});

fs.readFile("data.json", (err, data) => {
  if (!err) {
    users = JSON.parse(data);
  } else {
    console.log(err);
  }
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
  const { country, publish_date, title, content } = req.body;

  const imagePathInUploads = req.file ? `uploads/${req.file.filename}` : null;

  const story = {
    img: imagePathInUploads,
    country,
    publish_date,
    title,
    content,
  }

  fs.readFile('blogStories.json', (err, data) => {
    if(err){
      console.log(err)
      return res.status(500).send('Internal Server Error')
    }

    let stories = JSON.parse(data)

    stories.push(story)

    fs.writeFile('blogStories.json', JSON.stringify(stories, null, 2), (err) => {
      if(err){
        console.log(err)
        res.status(500).status('Internal Server Error', err)
      }

      res.status(200).send('Blog Stories added succesfully')
    })
  })
});

app.post('/loadBlogStories', (req, res) => {
  fs.readFile('blogStories.json', (err, data) => {
    if(err){
      console.log(err)
      res.status(500).send('Internal Server Error', err)
    }

    const stories = JSON.parse(data)
    res.status(200).json(stories)
  })
})

app.post("/login", (req, res) => {
  const { username, gmail, password } = req.body;

  // Find user by email
  const user = users.find(
    (user) => user.gmail === gmail && user.username === username
  );
  if (!user) {
    return res.status(401).json({ message: "Login failed. User not found." });
  }

  // Check if password is correct
  bcrypt.compare(password, user.password, (err, result) => {
    if (err || !result) {
      return res
        .status(401)
        .json({ message: "Login failed. Incorrect password." });
    }

    // Generate JWT token
    const token = generateToken({ username: user.username });

    // Add token to the user object
    user.token = token;

    // Write updated users data to data.json file
    fs.writeFile("data.json", JSON.stringify(users, null, 2), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      res.status(200).json({ message: "Login successful", token, user });
    });
  });
});

app.post("/register", (req, res) => {
  const { username, gmail, password } = req.body;

  const existingUser = users.find(
    (user) => user.username === username || user.gmail === gmail
  );

  if (existingUser) {
    res.status(500).send("Username or Gmail already exists");
  }

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      res.status(500).send("Internal Server Error", err);
      console.log(err);
    }

    users.push({ username, gmail, password: hash });

    const usersJSON = JSON.stringify(users, null, 2);

    fs.writeFile("data.json", usersJSON, (err) => {
      if (!err) {
        res.status(200).send("Data Written Succesful");
        console.log("Data Written Succesful");
      } else {
        res.status(500).send("Internal Server Error");
      }
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
