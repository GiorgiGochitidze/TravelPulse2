import ImagesContainer from "./ImagesContainer";
import './CSS/home.css'
import DestinationsList from "./DestinationsList";
import TopLocations from "./TopLocations";
import TravelStories from "./StoriesPage/TravelStories";

const Home = () => {
  return (
    <main>

        <ImagesContainer />

        <DestinationsList />

        <TopLocations />

        <TravelStories flexDirct={'column'} buttonState={'true'} headingVal={"Top Travel Stories"} descVal={"Explore our latest stories from our active users"} />
    </main>
  );
};

export default Home;