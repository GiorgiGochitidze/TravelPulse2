import TravelStoriesCard from "./TravelStoriesCard";



const StoriesList = ({rateContainer}) => {
  return (
    <div className="travelstories-list">
      <TravelStoriesCard  rateContainer={rateContainer} />
    </div>
  );
};

export default StoriesList;
