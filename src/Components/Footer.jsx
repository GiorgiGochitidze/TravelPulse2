import './CSS/footer.css'
import travelpulseicon from '../assets/travelpulseicon.png'


const Footer = () => {
    return ( 
        <footer>
            <img style={{width: '60px'}} src={travelpulseicon} alt="travel pulse logo icon" />
            <p>© 2024 Travel Pulse. All rights reserved</p>
        </footer>
     );
}
 
export default Footer;