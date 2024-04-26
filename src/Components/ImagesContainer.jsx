import "./CSS/imagescontainer.css";

const ImagesContainer = () => {
  return (
    <div className="landingpage-container">
      {/* <div className="logo"></div> */}

      <section className="layers">
        <div className="layers__container">
          <div className="layers__item layer-1"></div>
          <div className="layers__item layer-2"></div>
          <div className="layers__item layer-3">
            <div className="hero-content">
              <h1 className="landingpage-txt">Discover New Places and Create <br /> Unforgettable Memories <br /> With Us</h1>
              <div className="hero-content__p"></div>
              <button className="button-start">Start Adventure</button>
            </div>
          </div>
          <div className="layers__item layer-4">
            <canvas className="rain"></canvas>
          </div>
          <div className="layers__item layer-5"></div>
          <div className="layers__item layer-6"></div>
        </div>
      </section>
    </div>
  );
};

export default ImagesContainer;
