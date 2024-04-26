const Testing = () => {
  const optionsList = ["Most Popular ", "Newest ", "Oldest "];

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "400px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", gap: "30px" }} className="container">
          {optionsList.map((option) => (
            <p key={option}>{option}</p>
          ))}
        </div>
      </div>
    </>
  );
};

export default Testing;
