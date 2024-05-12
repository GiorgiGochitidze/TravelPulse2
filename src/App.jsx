import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
// import Home from "./Components/Home.jsx";
import Navbar from "./Navbar.jsx";
import Footer from "./Components/Footer.jsx";
import DestinationPage from "./Components/DestinationsPage/DestinationPage.jsx";
import Stories from "./Components/StoriesPage/Stories.jsx";
import ReviewsPage from "./Components/ReviewsPage/ReviewsPage.jsx";
import Register from "./Components/Register.jsx";
import LogIn from "./Components/LogIn.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import Loading from "./Components/Loading.jsx";
const Home = lazy(() => import("./Components/Home.jsx"));

// https://travelpulse.onrender.com/

function App() {
  const [userName, setUserName] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    AOS.init({ once: false, offset: 100 });
  }, []);

  return (
    <Router>
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />

      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          }
        />
        <Route path="/Destinations" element={<DestinationPage />} />
        <Route path="/Stories" element={<Stories />} />
        <Route path="/Reviews" element={<ReviewsPage />} />
        <Route path="/Register" element={<Register />} />
        <Route
          path="/LogIn"
          element={
            <LogIn
              setLoggedIn={setLoggedIn}
              userName={userName}
              setUserName={setUserName}
            />
          }
        />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
