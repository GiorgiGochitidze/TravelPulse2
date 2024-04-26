import { IoSearchOutline } from "react-icons/io5";
import "./CSS/searchbar.css";
import CheckBoxCard from "./CheckBoxCard";
import { useState } from "react";
import DestinationsCard from "./DestinationsCard";
import { cardsList } from "./cardsList";

const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const [openCard, setOpenCard] = useState(null);
  const [filteredCards, setFilteredCards] = useState(cardsList);
  const [buttonName, setButtonName] = useState('AllTypes')

  const countryOptions = [
    "Georgia",
    "Asia",
    "America",
    "Europe",
    "Germany",
    "Vatican City",
  ];
  const popularOptions = ["Most Popular", "Newest", "Oldest"];

  const toggleCard = (card) => {
    setOpenCard(card === openCard ? null : card);
  };

  const handleInputChange = (e) => {
    const value = e.target.value.trim().toLowerCase(); // Trim whitespace and convert to lowercase
    setInputValue(value);

    // Filter cards based on input value (matching both upper and lower case)
    const filtered = cardsList.filter(
      (card) =>
        card.place.toLowerCase().includes(value) ||
        card.place.toUpperCase().includes(value) ||
        card.continent.toLowerCase().includes(value) ||
        card.continent.toUpperCase().includes(value)
    );
    setFilteredCards(filtered);
  };

  const handleFilterClick = (filter) => {
    const filtered = cardsList.filter((card) => card.continent === filter);
    setFilteredCards(filtered);
  };

  return (
    <div className="destination-searchbar-container">
      <div className="searchbar-container">
        <div className="input-container" data-aos="fade-up"> 
          <input
            data-aos="fade-up"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Search for places, hotels or restaurants"
            type="text"
          />
          <IoSearchOutline className="search-icon" size={25} color="#4169E1" />
        </div>

        <div className="filters-container">
          <div className="filter-items">
            <div className="checkbox-main-container">
              <CheckBoxCard
              setButtonName={setButtonName}
              data-aos="fade-left"
                filtersHeading={buttonName}
                filterVersion={countryOptions}
                isOpen={openCard === "All Types"}
                toggleCard={() => toggleCard("All Types")}
                onFilterClick={handleFilterClick}
              />
              <CheckBoxCard
                filtersHeading={"Most Popular"}
                filterVersion={popularOptions}
                isOpen={openCard === "Most Popular"}
                toggleCard={() => toggleCard("Most Popular")}
              />
            </div>
          </div>

          <div className="destinations-list-container">
            <DestinationsCard cardsList={filteredCards} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
