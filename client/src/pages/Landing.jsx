import About from '../components/landing/About.jsx';
import LandingNavbar from '../components/landing/LandingNavbar.jsx';
import LandingFooter from '../components/landing/LandingFooter.jsx';
import FAQSection from '../components/landing/FAQSection.jsx';
import Features from '../components/landing/Features.jsx';
import FeaturesHighlights from '../components/landing/FeaturesHighlights.jsx';
import Hero from '../components/landing/Hero.jsx';
// import Preview from '../components/landing/Preview.jsx';
function Landing(){
    return (
        <div>
            <LandingNavbar/>
            <Hero/>
            <FeaturesHighlights/>
            {/* <Preview/> */}
            <About/>
            <Features/>
            <FAQSection/>
            <LandingFooter/>
           
        </div>
    )
}
export default Landing;