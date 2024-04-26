// import { useState } from 'react';
import { MdKeyboardArrowDown } from "react-icons/md";
import { motion } from "framer-motion";

const CheckBoxCard = ({
  filterVersion,
  filtersHeading,
  isOpen,
  toggleCard,
  onFilterClick,
  setButtonName
}) => {
  const arrowRotate = {
    transform: isOpen ? "rotate(180deg)" : "rotate(0)",
  };

  const handleDropdownItemClick = (filter) => {
    toggleCard(); // Close the dropdown
    onFilterClick(filter); // Invoke the callback function with the selected filter
  };

  return (
    <>
      <div
        onClick={toggleCard}
        className="checkboxes"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <p>{filtersHeading}</p>
        <MdKeyboardArrowDown style={arrowRotate} size={25} />
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, width: 0, height: 0 }}
          animate={{ opacity: 1, width: [0, "100%", "80%", "90%"], height: "auto" }}
          className="filter-dropbox"
        >
          {filterVersion.map((country) => (
            <p key={country} onClick={() => {handleDropdownItemClick(country)
            setButtonName(country)
            }}>
              {country}
            </p>
          ))}
        </motion.div>
      )}
    </>
  );
};

export default CheckBoxCard;
