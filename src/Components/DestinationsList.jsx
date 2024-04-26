import './CSS/destinationslist.css';
import beachimage from '../assets/DestinationsImg/beachimage.png';
import morroco from '../assets/DestinationsImg/morroco.png';
import mexico from '../assets/DestinationsImg/mexico.png';

const DestinationsList = () => {

    return ( 
        <div className="destinations-container">
            <div className="heading-container">
                <div>
                    <h1 data-aos="fade-up">Plan your best trip ever</h1><br />
                    <p data-aos="fade-up" data-aos-delay="100">Making the Most of Your Travel Experience in 2024</p>
                </div>
                <button data-aos="fade-left"  className='destinations-btn'>View All Destinations</button>
            </div>
            <div className="content-container"> 
                <div className="destinations-scroll">
                    <div data-aos="fade-up" className="destinations-card">
                        <img src={beachimage} alt="croatia img" />
                        <h2>Croatia</h2>
                    </div>
                    <div data-aos="fade-up" data-aos-delay="200" className="destinations-card">
                        <img src={morroco} alt="morocco img" />
                        <h2>Morocco</h2>
                    </div>
                    <div data-aos="fade-up" data-aos-delay="300" className="destinations-card">
                        <img src={mexico} alt="mexico img" />
                        <h2>Mexico</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default DestinationsList;
