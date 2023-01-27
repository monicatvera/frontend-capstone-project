import Owners from '../assets/Mario and Adrian A.jpg'
import Owners2 from '../assets/Mario and Adrian b.jpg'
import Header from './header'
const About = () =>
{
return(
    <div className='App'>
        <Header className='secondary'/>
         <div className='about'>
        <img src={Owners} className='owners' alt='Marion and Adrian' />
        <div className='about_us'>
            Based in Chicago, Illinois, Little Lemon is a family-owned Mediterranean restaurant, focused on traditional recipes served with a modern twist. The chefs draw inspiration from Italian, Greek and Turkish culture and have a menu of 12–15 items that they rotate seasonally. The restaurant has a rustic and relaxed atmosphere with moderate prices, making it a popular place for a meal any time of the day.<br/><br/>
            Little Lemon is owned by two Italian brothers, Mario and Adrian, who moved to the United States to pursue their shared dream of owning a restaurant. To craft the menu, Mario relies on family recipes and his experience as a chef in Italy. Adrian does all the marketing for the restaurant and led the effort to expand the menu beyond classic Italian to incorporate additional cuisines from the Mediterranean region.
        </div>
        <img src={Owners2} className='owners' alt='Marion and Adrian'/>
        </div>
    </div>
        )
}

export default About       