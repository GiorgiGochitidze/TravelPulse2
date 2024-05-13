import Loading from "../Loading";
import { lazy, Suspense } from "react";

const TravelStoriesCard = lazy(() => import("./TravelStoriesCard.jsx"));

const StoriesList = () => {
  return (
    <div className="travelstories-list">
      <Suspense fallback={<Loading />}>
        <TravelStoriesCard />
      </Suspense>
    </div>
  );
};

export default StoriesList;
