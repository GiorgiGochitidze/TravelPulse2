import React, { useRef } from "react";
import {
  MdKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";
import "./CSS/toplocations.css";
import shibuya from '../assets/TopLocationsImg/shibuya.png'
import colleseum from '../assets/TopLocationsImg/colleseum.png'
import blyderiver from '../assets/TopLocationsImg/blyderiver.png'

const TopLocations = () => {
  const contentContainerRef = useRef(null);

  const smoothScrollTo = (element, to, duration) => {
    const start = element.scrollLeft;
    const change = to - start;
    const startTime = performance.now();

    const animateScroll = (timestamp) => {
      const currentTime = timestamp - startTime;
      const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

      element.scrollLeft = start + change * easeInOutQuad(currentTime / duration);

      if (currentTime < duration) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  const scrollWindow = (amount) => {
    if (contentContainerRef.current) {
      const currentPosition = contentContainerRef.current.scrollLeft;
      const targetPosition = currentPosition + amount;
      smoothScrollTo(contentContainerRef.current, targetPosition, 500);
    }
  };

  return (
    <div className="toplocations-container">
      <div className="toplocations-heading-container">
        <div>
          <h1 data-aos="fade-up">Top Locations to Explore</h1>
          <br />
          <p data-aos="fade-up" data-aos-delay="200">Here are some of the most visited places in 2024</p>
        </div>

        <div className="arrowbuttons-container">
          <button data-aos="fade-left" data-aos-delay="300" onClick={() => scrollWindow(-350)}>
            <MdOutlineKeyboardArrowLeft size={25} color="white" />
          </button>
          <button data-aos="fade-left" data-aos-delay="450" onClick={() => scrollWindow(350)}>
            <MdKeyboardArrowRight size={25} color="white" />
          </button>
        </div>
      </div>
      <div ref={contentContainerRef} className="toplocations-list">
        <div className="toplocations-scroll">
          <div className="toplocations-card">
            <img  data-aos="fade-up" data-aos-delay="100" src={shibuya} alt="#" />
            <p data-aos="fade-up" data-aos-delay="200">Tokyo, Japan</p>
            <h2>The Shibuya</h2>
          </div>
          <div data-aos="fade-up" data-aos-delay="200" className="toplocations-card">
            <img src={colleseum} alt="#" />
            <p data-aos="fade-up" data-aos-delay="300">Rome, Italy</p>
            <h2>The Colleseum</h2>
          </div>
          <div data-aos="fade-up" data-aos-delay="300" className="toplocations-card">
            <img src={blyderiver} alt="#" />
            <p data-aos="fade-up" data-aos-delay="400">Capetown, South Africa</p>
            <h2>The Blyde River Canyon</h2>
          </div>

          <div data-aos="fade-left" data-aos-delay="400" className="toplocations-card">
            <img src={blyderiver} alt="#" />
            <p data-aos="fade-up" data-aos-delay="500">Capetown, South Africa</p>
            <h2>Mexico</h2>
          </div>

          <div data-aos="fade-left" data-aos-delay="500" className="toplocations-card">
            <img src={blyderiver} alt="#" />
            <p data-aos="fade-up" data-aos-delay="600">Capetown, South Africa</p>
            <h2>Mexico</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopLocations;
