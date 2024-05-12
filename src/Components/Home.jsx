// import ImagesContainer from "./ImagesContainer";
import "./CSS/home.css";
import DestinationsList from "./DestinationsList";
import TopLocations from "./TopLocations";
import TravelStories from "./StoriesPage/TravelStories";
import { Suspense, lazy } from "react";
import Loading from "./Loading.jsx";

const ImagesContainer = lazy(() => import("./ImagesContainer.jsx"));

const Home = () => {
  return (
    <main>
      <Suspense fallback={<Loading />}>
        <ImagesContainer />
      </Suspense>

      <DestinationsList />

      <TopLocations />

      <TravelStories
        flexDirct={"column"}
        buttonState={"true"}
        headingVal={"Top Travel Stories"}
        descVal={"Explore our latest stories from our active users"}
      />
    </main>
  );
};

export default Home;
