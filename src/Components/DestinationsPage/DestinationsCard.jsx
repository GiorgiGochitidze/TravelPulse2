const DestinationsCard = ({ cardsList }) => {

  return (
    <>
      {cardsList.length === 0 ? (
        <h1 className="no-match">No matching destinations found.</h1>
      ) : (
        cardsList.map((card, index) => {
          const filename = card.imageUrl.split("/").pop().split(".")[0];
          return (
            <div
              data-aos="fade-up"
              data-aos-delay={index + "00"}
              key={index}
              className="destinations-list-card"
            >
              <img src={card.imageUrl} alt={filename} />
              <p style={{ color: "gray" }}>{card.continent}</p>
              <h1>{card.place}</h1>
            </div>
          );
        })
      )}
    </>
  );
};

export default DestinationsCard;
